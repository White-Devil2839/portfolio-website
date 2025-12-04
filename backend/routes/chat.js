const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Resume = require('../models/Resume');

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ 
        message: 'Gemini API Key is missing. Please add GEMINI_API_KEY to backend/.env' 
      });
    }

    // Fetch context data
    const [projects, skills, resume] = await Promise.all([
      Project.find({}),
      Skill.find({}),
      Resume.findOne({})
    ]);

    // Construct system prompt
    const context = `
      You are an AI assistant for Divyansh Choudhary's portfolio website.
      Your role is to answer questions from HR, recruiters, and visitors about Divyansh's background, skills, and projects.
      
      Here is the data you have access to:
      
      RESUME:
      ${JSON.stringify(resume, null, 2)}
      
      PROJECTS:
      ${JSON.stringify(projects, null, 2)}
      
      SKILLS:
      ${JSON.stringify(skills, null, 2)}
      
      INSTRUCTIONS:
      - Be professional, polite, and concise.
      - Answer based ONLY on the provided data. If you don't know, say so.
      - Highlight relevant projects or skills when asked.
      - Keep responses short (under 150 words) unless asked for details.
      - If asked about contact info, refer to the contact section or resume.
    `;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: context }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I am ready to answer questions about Divyansh's portfolio." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });

  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

module.exports = router;
