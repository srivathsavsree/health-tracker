const express = require('express');
const router = express.Router();
const Activity = require('../models/Activity');
const auth = require('../middleware/auth');

// @route   POST api/activities
// @desc    Add an activity
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const activity = new Activity({
      ...req.body,
      user: req.user.id
    });

    await activity.save();
    await activity.updateGoals();

    // Get updated activity with populated fields
    const savedActivity = await Activity.findById(activity._id);
    res.json({
      activity: savedActivity,
      message: 'Activity added successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/activities
// @desc    Get all activities
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { date, type, status } = req.query;
    const query = { user: req.user.id };

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      
      query.date = {
        $gte: startDate,
        $lte: endDate
      };
    }

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    const activities = await Activity.find(query)
      .sort({ date: -1, createdAt: -1 })
      .limit(50);

    // Calculate summary for the period
    const summary = {
      totalActivities: activities.length,
      totalDuration: activities.reduce((sum, act) => sum + act.duration, 0),
      totalCalories: activities.reduce((sum, act) => sum + act.calories, 0),
      byType: {}
    };

    activities.forEach(activity => {
      if (!summary.byType[activity.type]) {
        summary.byType[activity.type] = {
          count: 0,
          duration: 0,
          calories: 0
        };
      }
      summary.byType[activity.type].count++;
      summary.byType[activity.type].duration += activity.duration;
      summary.byType[activity.type].calories += activity.calories;
    });

    res.json({
      activities,
      summary
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/activities/stats
// @desc    Get activity statistics
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

    const activities = await Activity.find({
      user: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const stats = {
      totalDuration: 0,
      totalCalories: 0,
      totalDistance: 0,
      totalActivities: activities.length,
      averageDuration: 0,
      byType: {},
      byDay: {},
      streak: {
        current: 0,
        longest: 0
      }
    };

    let currentStreak = 0;
    let longestStreak = 0;
    let lastActivityDate = null;

    activities.forEach(activity => {
      stats.totalDuration += activity.duration;
      stats.totalCalories += activity.calories;
      if (activity.distance) {
        stats.totalDistance += activity.distance;
      }

      // Stats by activity type
      if (!stats.byType[activity.type]) {
        stats.byType[activity.type] = {
          count: 0,
          duration: 0,
          calories: 0,
          distance: 0
        };
      }
      stats.byType[activity.type].count++;
      stats.byType[activity.type].duration += activity.duration;
      stats.byType[activity.type].calories += activity.calories;
      if (activity.distance) {
        stats.byType[activity.type].distance += activity.distance;
      }

      // Stats by day
      const day = activity.date.toISOString().split('T')[0];
      if (!stats.byDay[day]) {
        stats.byDay[day] = {
          duration: 0,
          calories: 0,
          distance: 0,
          activities: []
        };
      }
      stats.byDay[day].duration += activity.duration;
      stats.byDay[day].calories += activity.calories;
      if (activity.distance) {
        stats.byDay[day].distance += activity.distance;
      }
      stats.byDay[day].activities.push(activity);

      // Calculate streak
      const activityDate = new Date(activity.date).toISOString().split('T')[0];
      if (!lastActivityDate) {
        currentStreak = 1;
      } else {
        const dayDiff = Math.floor(
          (new Date(lastActivityDate) - new Date(activityDate)) / (1000 * 60 * 60 * 24)
        );
        if (dayDiff === 1) {
          currentStreak++;
        } else if (dayDiff > 1) {
          if (currentStreak > longestStreak) {
            longestStreak = currentStreak;
          }
          currentStreak = 1;
        }
      }
      lastActivityDate = activityDate;
    });

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
    }

    stats.streak.current = currentStreak;
    stats.streak.longest = longestStreak;
    stats.averageDuration = activities.length ? stats.totalDuration / activities.length : 0;

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/activities/:id
// @desc    Update an activity
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedActivity = await Activity.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await updatedActivity.updateGoals();

    res.json({
      activity: updatedActivity,
      message: 'Activity updated successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/activities/:id
// @desc    Delete an activity
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    if (activity.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await activity.remove();
    res.json({ message: 'Activity removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 