const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

// GET - Get resume data
router.get('/', async (req, res) => {
  try {
    const resume = await Resume.findOne();
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT - Upsert resume data
router.put('/', async (req, res) => {
  try {
    const updatedResume = await Resume.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
      runValidators: true,
    });
    res.json(updatedResume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;