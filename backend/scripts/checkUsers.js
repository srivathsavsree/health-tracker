require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const checkUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to MongoDB');

    const users = await User.find().select('-password');
    console.log('\nExisting users:');
    console.log(JSON.stringify(users, null, 2));

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkUsers(); 