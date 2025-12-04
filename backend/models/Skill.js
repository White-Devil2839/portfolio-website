const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['programming', 'framework', 'database', 'tool', 'soft-skill'],
    required: true
  },
  proficiency: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  icon: {
    type: String
  },
  color: {
    type: String,
    default: '#3B82F6'
  }
});

module.exports = mongoose.model('Skill', skillSchema);
