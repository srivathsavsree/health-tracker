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
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/users/me
// @desc    Update current user
// @access  Private
router.put('/me', auth, async (req, res) => {
  try {
    const { name, email, settings } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (settings) user.settings = { ...user.settings, ...settings };

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
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
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 