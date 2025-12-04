const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const nodemailer = require('nodemailer');

const hasMailCredentials = process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD;

// Configure nodemailer
const transporter = hasMailCredentials
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  : null;

// POST - Create new message and send email
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const newMessage = new Message({
      name,
      email,
      message
    });

    await newMessage.save();

    // Send email notification
    const mailOptions = {
      from: process.env.GMAIL_USER,
      replyTo: email,
      to: process.env.GMAIL_USER,
      subject: `New Portfolio Message from ${name}`,
      html: `
        <h3>New Message from Portfolio Contact Form</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    if (transporter) {
      await transporter.sendMail(mailOptions);
    } else {
      console.warn('GMAIL credentials missing - skipping email notification');
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!'
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending message'
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