const express = require('express');
const router = express.Router();
const Meal = require('../models/Meal');
const auth = require('../middleware/auth');
const achievementChecker = require('../middleware/achievementChecker');

// @route   POST api/meals
// @desc    Add a meal
// @access  Private
router.post('/', 
  auth, 
  achievementChecker('nutrition', 'meals'),
  async (req, res) => {
    try {
      const { name, type, calories, protein, carbs, fat, timestamp } = req.body;
      
      const meal = new Meal({
        user: req.user.id,
        name,
        type,
        calories,
        protein,
        carbs,
        fat,
        timestamp: timestamp || Date.now()
      });

      await meal.save();
      await meal.updateGoals();

      // Get updated meal with populated fields
      const savedMeal = await Meal.findById(meal._id);
      res.json({
        meal: savedMeal,
        message: 'Meal added successfully'
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   GET api/meals
// @desc    Get all meals
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { date, type, isTemplate } = req.query;
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

    if (isTemplate !== undefined) {
      query.isTemplate = isTemplate === 'true';
    }

    const meals = await Meal.find(query)
      .sort({ date: -1, time: -1 })
      .limit(50);

    // Calculate summary for the period
    const summary = {
      totalMeals: meals.length,
      totalCalories: meals.reduce((sum, meal) => sum + meal.calories, 0),
      totalProtein: meals.reduce((sum, meal) => sum + meal.protein, 0),
      totalCarbs: meals.reduce((sum, meal) => sum + meal.carbs, 0),
      totalFat: meals.reduce((sum, meal) => sum + meal.fat, 0),
      byType: {}
    };

    meals.forEach(meal => {
      if (!summary.byType[meal.type]) {
        summary.byType[meal.type] = {
          count: 0,
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        };
      }
      summary.byType[meal.type].count++;
      summary.byType[meal.type].calories += meal.calories;
      summary.byType[meal.type].protein += meal.protein;
      summary.byType[meal.type].carbs += meal.carbs;
      summary.byType[meal.type].fat += meal.fat;
    });

    res.json({
      meals,
      summary
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET api/meals/stats
// @desc    Get meal statistics
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

    const meals = await Meal.find({
      user: req.user.id,
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });

    const stats = {
      totalMeals: meals.length,
      totalCalories: 0,
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      averageCalories: 0,
      averageProtein: 0,
      averageCarbs: 0,
      averageFat: 0,
      byType: {},
      byDay: {},
      commonIngredients: {}
    };

    meals.forEach(meal => {
      stats.totalCalories += meal.calories;
      stats.totalProtein += meal.protein;
      stats.totalCarbs += meal.carbs;
      stats.totalFat += meal.fat;

      // Stats by meal type
      if (!stats.byType[meal.type]) {
        stats.byType[meal.type] = {
          count: 0,
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0
        };
      }
      stats.byType[meal.type].count++;
      stats.byType[meal.type].calories += meal.calories;
      stats.byType[meal.type].protein += meal.protein;
      stats.byType[meal.type].carbs += meal.carbs;
      stats.byType[meal.type].fat += meal.fat;

      // Stats by day
      const day = meal.date.toISOString().split('T')[0];
      if (!stats.byDay[day]) {
        stats.byDay[day] = {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          meals: []
        };
      }
      stats.byDay[day].calories += meal.calories;
      stats.byDay[day].protein += meal.protein;
      stats.byDay[day].carbs += meal.carbs;
      stats.byDay[day].fat += meal.fat;
      stats.byDay[day].meals.push(meal);

      // Track common ingredients
      meal.ingredients.forEach(ingredient => {
        if (!stats.commonIngredients[ingredient.name]) {
          stats.commonIngredients[ingredient.name] = {
            count: 0,
            totalAmount: 0,
            unit: ingredient.unit
          };
        }
        stats.commonIngredients[ingredient.name].count++;
        stats.commonIngredients[ingredient.name].totalAmount += ingredient.amount;
      });
    });

    if (meals.length > 0) {
      stats.averageCalories = stats.totalCalories / meals.length;
      stats.averageProtein = stats.totalProtein / meals.length;
      stats.averageCarbs = stats.totalCarbs / meals.length;
      stats.averageFat = stats.totalFat / meals.length;
    }

    // Sort common ingredients by frequency
    stats.commonIngredients = Object.entries(stats.commonIngredients)
      .sort(([, a], [, b]) => b.count - a.count)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});

    res.json(stats);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT api/meals/:id
// @desc    Update a meal
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    await updatedMeal.updateGoals();

    res.json({
      meal: updatedMeal,
      message: 'Meal updated successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE api/meals/:id
// @desc    Delete a meal
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);

    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }

    if (meal.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await meal.remove();
    res.json({ message: 'Meal removed successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 