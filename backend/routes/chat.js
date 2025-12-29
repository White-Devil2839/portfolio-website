const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Resume = require('../models/Resume');

/* --------------------------------------------------
   GLOBAL GEMINI COOLDOWN LOCK
-------------------------------------------------- */
let geminiCooldownUntil = 0;

/* --------------------------------------------------
   ANSWER VARIATION MEMORY (last 3 replies)
-------------------------------------------------- */
let recentReplies = [];

const rememberReply = (text) => {
  recentReplies.push(text);
  if (recentReplies.length > 3) {
    recentReplies.shift();
  }
};

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: 'Gemini API Key is missing'
      });
    }

    if (!message || !message.trim()) {
      return res.json({ reply: 'Please enter a valid question.' });
    }

    const userMessage = message.toLowerCase().trim();

    /* --------------------------------------------------
       1️⃣ LOCAL GREETINGS (NEVER HIT GEMINI)
    -------------------------------------------------- */
    if (['hi', 'hello', 'hey', 'hii'].includes(userMessage)) {
      return res.json({
        reply:
          "Hello! I’m Divyansh’s AI assistant. You can ask me about his projects, skills, education, or experience as presented on this website."
      });
    }

    /* --------------------------------------------------
       2️⃣ LOCAL HR-SAFE QUESTIONS (NO AI)
    -------------------------------------------------- */
    if (userMessage.includes('salary') || userMessage.includes('pay')) {
      return res.json({
        reply:
          "Compensation for an early-career full stack developer typically depends on location, company size, and responsibilities. Candidates with strong fundamentals and practical project experience are generally compensated competitively."
      });
    }

    /* --------------------------------------------------
       3️⃣ HARD COOLDOWN LOCK (AI ONLY)
    -------------------------------------------------- */
    const now = Date.now();
    if (now < geminiCooldownUntil) {
      const waitSeconds = Math.ceil((geminiCooldownUntil - now) / 1000);
      return res.json({
        reply: `I’m currently handling a high number of requests. Please wait ${waitSeconds} seconds and try again.`,
        retryAfter: waitSeconds
      });
    }

    /* --------------------------------------------------
       FETCH DATABASE CONTEXT
    -------------------------------------------------- */
    const [projects, skills, resume] = await Promise.all([
      Project.find({}),
      Skill.find({}),
      Resume.findOne({})
    ]);

    /* --------------------------------------------------
       HR-STYLE + VARIATION-AWARE PROMPT
    -------------------------------------------------- */
    const context = `
You are an AI assistant representing Divyansh Choudhary to HR professionals and recruiters.

TONE & STYLE:
- Professional, calm, and confident
- HR-friendly language
- Short paragraphs only
- No hype or exaggeration
- Focus on skills, learning ability, and practical experience

FORMAT RULES (VERY IMPORTANT):
- Do NOT use markdown
- Do NOT use bullet points
- Do NOT use numbered lists
- Do NOT use asterisks (*)
- Do NOT use bold or italic text
- Write in natural paragraphs only

VARIATION RULE:
- Avoid repeating sentence structures or phrasing used in previous answers
- Rephrase ideas differently when answering similar questions

PREVIOUS ANSWERS (DO NOT REPEAT PHRASING):
${recentReplies.join('\n---\n')}

DATA (USE ONLY THIS INFORMATION):

RESUME:
${JSON.stringify(resume, null, 2)}

PROJECTS:
${JSON.stringify(projects, null, 2)}

SKILLS:
${JSON.stringify(skills, null, 2)}

If information is not available, respond with:
"This information is not specified in the resume."
`;

    /* --------------------------------------------------
       GEMINI CALL
    -------------------------------------------------- */
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: `${context}\n\nUSER QUESTION:\n${message}` }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    /* --------------------------------------------------
       RATE LIMIT HANDLING
    -------------------------------------------------- */
    if (!response.ok && data?.error?.code === 429) {
      let waitSeconds = 60;
      const match = data?.error?.message?.match(/retry in ([0-9.]+)s/i);
      if (match && match[1]) {
        waitSeconds = Math.ceil(Number(match[1]));
      }

      geminiCooldownUntil = Date.now() + waitSeconds * 1000;

      return res.json({
        reply: `I’m currently receiving many requests. Please wait ${waitSeconds} seconds and try again.`,
        retryAfter: waitSeconds
      });
    }

    if (!response.ok) {
      console.error('Gemini API Error:', data);
      return res.status(500).json({ message: 'Gemini API failed' });
    }

    /* --------------------------------------------------
       CLEAN + STORE REPLY
    -------------------------------------------------- */
    let reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'This information is not specified in the resume.';

    // Final safety cleanup
    reply = reply
      .replace(/\*\*/g, '')
      .replace(/\*/g, '')
      .replace(/^\s*\d+\.\s*/gm, '')
      .trim();

    rememberReply(reply);

    res.json({ reply });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
