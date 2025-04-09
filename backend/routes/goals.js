const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

// @route   POST api/goals
// @desc    Add goal
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { type, target, startDate, endDate, milestones } = req.body;

    // Validate required fields
    if (!type || !target || !startDate || !endDate) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: type, target, startDate, and endDate' 
      });
    }

    // Parse dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);

    // Validate dates
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ 
        message: 'Invalid date format. Please use ISO format (YYYY-MM-DD) or ISO datetime' 
      });
    }

    // Validate date range
    if (parsedEndDate <= parsedStartDate) {
      return res.status(400).json({ 
        message: 'End date must be after start date' 
      });
    }
    
    const goal = new Goal({
      user: req.user.id,
      type,
      target,
      startDate: parsedStartDate,
      endDate: parsedEndDate,
      milestones: milestones || []
    });

    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ 
        message: 'Validation error', 
        errors: Object.values(err.errors).map(e => e.message) 
      });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/goals
// @desc    Get goals
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { type, status } = req.query;
    const query = { user: req.user.id };

    if (type) {
      query.type = type;
    }

    if (status) {
      query.status = status;
    }

    const goals = await Goal.find(query).sort({ createdAt: -1 });
    res.json(goals);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/goals/:id
// @desc    Update goal
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { progress, status } = req.body;
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (progress !== undefined) {
      goal.progress = progress;
    }

    if (status) {
      goal.status = status;
    }

    await goal.save();
    res.json(goal);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/goals/:id
// @desc    Delete goal
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    if (goal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await goal.remove();
    res.json({ message: 'Goal removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/goals/stats
// @desc    Get goal statistics
// @access  Private
router.get('/stats', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id });

    const stats = {
      total: goals.length,
      completed: goals.filter(g => g.status === 'completed').length,
      inProgress: goals.filter(g => g.status === 'in-progress').length,
      notStarted: goals.filter(g => g.status === 'not-started').length,
      byType: {}
    };

    goals.forEach(goal => {
      if (!stats.byType[goal.type]) {
        stats.byType[goal.type] = {
          total: 0,
          completed: 0,
          inProgress: 0,
          notStarted: 0
        };
      }

      stats.byType[goal.type].total++;
      stats.byType[goal.type][goal.status]++;
    });

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 