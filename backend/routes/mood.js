const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const auth = require('../middleware/auth');

// @route   POST api/mood
// @desc    Add mood record
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { rating, activities, notes, location } = req.body;
    
    const mood = new Mood({
      user: req.user.id,
      rating,
      activities,
      notes,
      location
    });

    await mood.save();
    res.json(mood);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/mood
// @desc    Get mood records
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

    const moodRecords = await Mood.find(query).sort({ date: -1 });
    res.json(moodRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/mood/stats
// @desc    Get mood statistics
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

    const moodRecords = await Mood.find({
      user: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const stats = {
      averageRating: 0,
      totalRecords: moodRecords.length,
      byDay: {},
      byActivity: {},
      byLocation: {}
    };

    if (moodRecords.length > 0) {
      const totalRating = moodRecords.reduce((sum, record) => sum + record.rating, 0);
      stats.averageRating = totalRating / moodRecords.length;

      moodRecords.forEach(record => {
        const day = record.date.toISOString().split('T')[0];
        if (!stats.byDay[day]) {
          stats.byDay[day] = {
            rating: 0,
            count: 0
          };
        }
        stats.byDay[day].rating += record.rating;
        stats.byDay[day].count++;

        record.activities.forEach(activity => {
          if (!stats.byActivity[activity]) {
            stats.byActivity[activity] = {
              rating: 0,
              count: 0
            };
          }
          stats.byActivity[activity].rating += record.rating;
          stats.byActivity[activity].count++;
        });

        if (record.location) {
          const location = record.location.name || 'Unknown';
          if (!stats.byLocation[location]) {
            stats.byLocation[location] = {
              rating: 0,
              count: 0
            };
          }
          stats.byLocation[location].rating += record.rating;
          stats.byLocation[location].count++;
        }
      });

      // Calculate averages
      Object.keys(stats.byDay).forEach(day => {
        stats.byDay[day].rating /= stats.byDay[day].count;
      });

      Object.keys(stats.byActivity).forEach(activity => {
        stats.byActivity[activity].rating /= stats.byActivity[activity].count;
      });

      Object.keys(stats.byLocation).forEach(location => {
        stats.byLocation[location].rating /= stats.byLocation[location].count;
      });
    }

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 