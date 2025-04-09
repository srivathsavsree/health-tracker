const express = require('express');
const router = express.Router();
const Badge = require('../models/Badge');
const UserBadge = require('../models/UserBadge');
const auth = require('../middleware/auth');

// @route   GET api/badges
// @desc    Get all badges for user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const badges = await Badge.getUserBadges(req.user.id);
    res.json(badges);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/badges/:id
// @desc    Get badge by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    const userBadge = await UserBadge.findOne({
      user: req.user.id,
      badge: req.params.id
    });

    res.json({
      ...badge.toObject(),
      earned: !!userBadge,
      isEquipped: userBadge ? userBadge.isEquipped : false
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/badges/:id/check
// @desc    Check if badge is earned
// @access  Private
router.post('/:id/check', auth, async (req, res) => {
  try {
    const result = await Badge.checkEarned(req.user.id, req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/badges/:id/equip
// @desc    Equip badge
// @access  Private
router.post('/:id/equip', auth, async (req, res) => {
  try {
    const userBadge = await UserBadge.findOne({
      user: req.user.id,
      badge: req.params.id
    });

    if (!userBadge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    await userBadge.equip();
    res.json({ message: 'Badge equipped successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST api/badges/:id/unequip
// @desc    Unequip badge
// @access  Private
router.post('/:id/unequip', auth, async (req, res) => {
  try {
    const userBadge = await UserBadge.findOne({
      user: req.user.id,
      badge: req.params.id
    });

    if (!userBadge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    await userBadge.unequip();
    res.json({ message: 'Badge unequipped successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/badges/:id/history
// @desc    Get badge history
// @access  Private
router.get('/:id/history', auth, async (req, res) => {
  try {
    const userBadge = await UserBadge.findOne({
      user: req.user.id,
      badge: req.params.id
    });

    if (!userBadge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    res.json(userBadge.history);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/badges/stats/overview
// @desc    Get badge statistics
// @access  Private
router.get('/stats/overview', auth, async (req, res) => {
  try {
    const userBadges = await UserBadge.find({ user: req.user.id })
      .populate('badge');

    const stats = {
      total: userBadges.length,
      earned: userBadges.filter(b => b.earnedAt).length,
      equipped: userBadges.filter(b => b.isEquipped).length,
      points: userBadges.reduce((sum, b) => sum + b.badge.points, 0),
      byCategory: {},
      byRarity: {}
    };

    userBadges.forEach(ub => {
      const { category, rarity } = ub.badge;
      
      if (!stats.byCategory[category]) {
        stats.byCategory[category] = { total: 0, earned: 0 };
      }
      stats.byCategory[category].total++;
      if (ub.earnedAt) {
        stats.byCategory[category].earned++;
      }

      if (!stats.byRarity[rarity]) {
        stats.byRarity[rarity] = { total: 0, earned: 0 };
      }
      stats.byRarity[rarity].total++;
      if (ub.earnedAt) {
        stats.byRarity[rarity].earned++;
      }
    });

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 