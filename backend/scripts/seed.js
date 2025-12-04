const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Resume = require('../models/Resume');
const sampleData = require('../data/sampleData');

const args = process.argv.slice(2);

const shouldLoadSample = args.includes('--sample') || args.length === 0;
const shouldClearOnly = args.includes('--clear');

const seed = async () => {
  await connectDB();

  if (shouldClearOnly || shouldLoadSample) {
    await Promise.all([Project.deleteMany(), Skill.deleteMany(), Resume.deleteMany()]);
    console.log('Cleared projects, skills, and resume collections');
  }

  if (shouldClearOnly) {
    mongoose.connection.close();
    console.log('Database cleared.');
    return;
  }

  if (shouldLoadSample) {
    await Project.insertMany(sampleData.projects);
    await Skill.insertMany(sampleData.skills);
    await Resume.create(sampleData.resume);

    console.log('Inserted sample projects, skills, and resume data');
  }

  mongoose.connection.close();
  console.log('Seeding finished.');
};

seed().catch((error) => {
  console.error('Seeding failed:', error);
  mongoose.connection.close();
  process.exit(1);
});

