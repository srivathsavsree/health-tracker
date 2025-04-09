const express = require('express');
const router = express.Router();
const Sleep = require('../models/Sleep');
const auth = require('../middleware/auth');
const achievementChecker = require('../middleware/achievementChecker');

// @route   POST api/sleep
// @desc    Add sleep record
// @access  Private
router.post('/', 
  auth, 
  achievementChecker('sleep', 'sleep'),
  async (req, res) => {
    try {
      const { duration, quality, startTime, endTime } = req.body;
      
      const sleep = new Sleep({
        user: req.user.id,
        duration,
        quality,
        startTime,
        endTime
      });

      await sleep.save();
      res.json(sleep);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/sleep
// @desc    Get sleep records
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = { user: req.user.id };

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const sleepRecords = await Sleep.find(query).sort({ date: -1 });
    res.json(sleepRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/sleep/stats
// @desc    Get sleep statistics
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

    const sleepRecords = await Sleep.find({
      user: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const stats = {
      averageDuration: 0,
      averageQuality: 0,
      totalRecords: sleepRecords.length,
      byDay: {}
    };

    if (sleepRecords.length > 0) {
      const totalDuration = sleepRecords.reduce((sum, record) => {
        const duration = (record.endTime - record.startTime) / (1000 * 60 * 60);
        return sum + duration;
      }, 0);

      const totalQuality = sleepRecords.reduce((sum, record) => sum + record.quality, 0);

      stats.averageDuration = totalDuration / sleepRecords.length;
      stats.averageQuality = totalQuality / sleepRecords.length;

      sleepRecords.forEach(record => {
        const day = record.date.toISOString().split('T')[0];
        if (!stats.byDay[day]) {
          stats.byDay[day] = {
            duration: 0,
            quality: 0,
            count: 0
          };
        }
        const duration = (record.endTime - record.startTime) / (1000 * 60 * 60);
        stats.byDay[day].duration += duration;
        stats.byDay[day].quality += record.quality;
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