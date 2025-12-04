const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, default: 'Present' },
    description: [{ type: String }],
  },
  { _id: false }
);

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    location: { type: String },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    gpa: { type: String },
    achievements: [{ type: String }],
  },
  { _id: false }
);

const certificationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    issuer: { type: String },
    date: { type: String },
  },
  { _id: false }
);

const resumeSchema = new mongoose.Schema(
  {
    personalInfo: {
      name: { type: String, required: true },
      title: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String },
      location: { type: String },
      website: { type: String },
      linkedin: { type: String },
      github: { type: String },
    },
    summary: { type: String, required: true },
    experience: [experienceSchema],
    education: [educationSchema],
    skills: {
      technical: [{ type: String }],
      soft: [{ type: String }],
    },
    certifications: [certificationSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);

