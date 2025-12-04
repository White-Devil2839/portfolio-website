require("dotenv").config();
const mongoose = require("mongoose");

const Project = require("../models/Project");
const Skill = require("../models/Skill");
const Resume = require("../models/Resume");

const data = require("./data");

(async function () {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("🚮 Clearing old data...");
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Resume.deleteMany({});

    console.log("📥 Importing new data...");
    await Project.insertMany(data.projects);
    await Skill.insertMany(data.skills);
    await Resume.create(data.resume);

    console.log("✅ Done! Data successfully imported.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error importing data:", err);
    process.exit(1);
  }
})();
