const express = require('express');
const router = express.Router();
const Water = require('../models/Water');
const auth = require('../middleware/auth');
const achievementChecker = require('../middleware/achievementChecker');

// @route   POST api/water
// @desc    Add water intake record
// @access  Private
router.post('/', 
  auth, 
  achievementChecker('water', 'water'),
  async (req, res) => {
    try {
      const { glasses, timestamp } = req.body;
      
      const water = new Water({
        user: req.user.id,
        glasses,
        timestamp: timestamp || Date.now()
      });

      await water.save();
      res.json(water);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/water
// @desc    Get water intake records
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { date } = req.query;
    const query = { user: req.user.id };

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      query.time = {
        $gte: startDate,
        $lte: endDate
      };
    }

    const waterRecords = await Water.find(query).sort({ time: -1 });
    res.json(waterRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/water/stats
// @desc    Get water intake statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    const endDate = new Date();
    const startDate = new Date();

    switch (period) {
      case 'week':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'year':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
    }

    const waterRecords = await Water.find({
      user: req.user.id,
      time: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const stats = {
      totalAmount: 0,
      averageAmount: 0,
      totalRecords: waterRecords.length,
      byDay: {}
    };

    if (waterRecords.length > 0) {
      const totalAmount = waterRecords.reduce((sum, record) => sum + record.amount, 0);
      stats.totalAmount = totalAmount;
      stats.averageAmount = totalAmount / waterRecords.length;

      waterRecords.forEach(record => {
        const day = record.time.toISOString().split('T')[0];
        if (!stats.byDay[day]) {
          stats.byDay[day] = {
            amount: 0,
            count: 0
          };
        }
        stats.byDay[day].amount += record.amount;
        stats.byDay[day].count++;
      });
    }

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 