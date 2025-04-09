const mongoose = require('mongoose');
const Achievement = require('../models/Achievement');
const Badge = require('../models/Badge');
const achievements = require('./seeds/achievements');
const badges = require('./seeds/badges');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB...');

    // Clear existing data
    await Achievement.deleteMany({});
    await Badge.deleteMany({});

    console.log('Cleared existing achievements and badges...');

    // Insert achievements
    await Achievement.insertMany(achievements);
    console.log('Achievements seeded successfully!');

    // Insert badges
    await Badge.insertMany(badges);
    console.log('Badges seeded successfully!');

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 