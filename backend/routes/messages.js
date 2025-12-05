const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const { Resend } = require('resend');

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

// POST - Create new message and send email via Resend
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save message to MongoDB
    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    // Send email using Resend
    if (resend) {
      const recipientEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;

      if (recipientEmail) {
        const { data, error } = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: recipientEmail,
          reply_to: email,
          subject: `New Portfolio Message from ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `
        });
        

        if (error) {
          console.error('Resend API Error:', error);
        } else {
          console.log('Email sent successfully via Resend. Response:', data);
        }
      } else {
        console.warn('No recipient email configured (CONTACT_EMAIL or GMAIL_USER missing).');
      }
    } else {
      console.warn('Resend client not initialized (missing API key).');
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully!'
    });

  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send message'
    });
  }
});

// GET - Get all messages (for admin)
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;