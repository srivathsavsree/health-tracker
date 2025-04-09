const express = require('express');
const router = express.Router();
const Achievement = require('../models/Achievement');
const UserAchievement = require('../models/UserAchievement');
const auth = require('../middleware/auth');

// @route   GET api/achievements
// @desc    Get all achievements for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const achievements = await Achievement.getUserAchievements(req.user.id);
    res.json(achievements);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/achievements/:id
// @desc    Get achievement by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    const userAchievement = await UserAchievement.findOne({
      user: req.user.id,
      achievement: req.params.id
    });

    res.json({
      ...achievement.toObject(),
      progress: userAchievement ? userAchievement.progress : 0,
      isCompleted: userAchievement ? userAchievement.isCompleted : false
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/achievements/:id/check
// @desc    Check achievement progress
// @access  Private
router.post('/:id/check', auth, async (req, res) => {
  try {
    const { progress } = req.body;
    
    if (typeof progress !== 'number') {
      return res.status(400).json({ message: 'Progress must be a number' });
    }

    const result = await Achievement.checkCompletion(req.user.id, req.params.id, progress);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/achievements/:id/claim
// @desc    Claim achievement rewards
// @access  Private
router.post('/:id/claim', auth, async (req, res) => {
  try {
    const userAchievement = await UserAchievement.findOne({
      user: req.user.id,
      achievement: req.params.id
    });

    if (!userAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    if (!userAchievement.isCompleted) {
      return res.status(400).json({ message: 'Achievement not completed' });
    }

    if (userAchievement.rewardsClaimed) {
      return res.status(400).json({ message: 'Rewards already claimed' });
    }

    userAchievement.rewardsClaimed = true;
    userAchievement.rewardsClaimedAt = new Date();
    await userAchievement.save();

    res.json({ message: 'Rewards claimed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/achievements/:id/history
// @desc    Get achievement history
// @access  Private
router.get('/:id/history', auth, async (req, res) => {
  try {
    const userAchievement = await UserAchievement.findOne({
      user: req.user.id,
      achievement: req.params.id
    });

    if (!userAchievement) {
      return res.status(404).json({ message: 'Achievement not found' });
    }

    res.json(userAchievement.history);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/achievements/stats/overview
// @desc    Get achievement statistics
// @access  Private
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const userAchievements = await UserAchievement.find({ user: req.user.id })
      .populate('achievement');

    const stats = {
      total: userAchievements.length,
      completed: userAchievements.filter(a => a.isCompleted).length,
      points: userAchievements.reduce((sum, a) => sum + (a.isCompleted ? a.achievement.points : 0), 0),
      byCategory: {},
      byType: {}
    };

    userAchievements.forEach(ua => {
      const { category, type } = ua.achievement;
      
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = { total: 0, completed: 0 };
      }
      stats.byCategory[category].total++;
      if (ua.isCompleted) {
        stats.byCategory[category].completed++;
      }

      if (!stats.byType[type]) {
        stats.byType[type] = { total: 0, completed: 0 };
      }
      stats.byType[type].total++;
      if (ua.isCompleted) {
        stats.byType[type].completed++;
      }
    });

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 