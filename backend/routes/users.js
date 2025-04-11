const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/users/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Error fetching user:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/users/me
// @desc    Update current user
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    console.log('Updating user profile:', req.body);
    
    const { name, email, height, weight, age, gender, activityLevel, settings } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate numeric fields
    if (height !== undefined && isNaN(Number(height))) {
      return res.status(400).json({ message: 'Height must be a number' });
    }
    if (weight !== undefined && isNaN(Number(weight))) {
      return res.status(400).json({ message: 'Weight must be a number' });
    }
    if (age !== undefined && isNaN(Number(age))) {
      return res.status(400).json({ message: 'Age must be a number' });
    }

    // Validate gender
    if (gender && !['male', 'female', 'other'].includes(gender)) {
      return res.status(400).json({ message: 'Invalid gender value' });
    }

    // Validate activity level
    if (activityLevel && !['sedentary', 'light', 'moderate', 'active', 'extra'].includes(activityLevel)) {
      return res.status(400).json({ message: 'Invalid activity level' });
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (height !== undefined) user.height = Number(height);
    if (weight !== undefined) user.weight = Number(weight);
    if (age !== undefined) user.age = Number(age);
    if (gender) user.gender = gender;
    if (activityLevel) user.activityLevel = activityLevel;
    if (settings) user.settings = { ...user.settings, ...settings };

    await user.save();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;
    
    console.log('Updated user profile:', userResponse);
    res.json(userResponse);
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stats = {
      points: user.points || 0,
      level: user.level || 1,
      achievements: {
        total: user.achievements?.length || 0,
        completed: user.achievements?.filter(a => a.completed).length || 0
      },
      badges: {
        total: user.badges?.length || 0,
        equipped: user.badges?.filter(b => b.equipped).length || 0
      }
    };

    res.json(stats);
  } catch (err) {
    console.error('Error fetching stats:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 