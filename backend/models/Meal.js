const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true,
    min: 0
  },
  protein: {
    type: Number,
    required: true,
    min: 0
  },
  carbs: {
    type: Number,
    required: true,
    min: 0
  },
  fat: {
    type: Number,
    required: true,
    min: 0
  },
  ingredients: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    unit: {
      type: String,
      required: true
    },
    calories: {
      type: Number,
      required: true,
      min: 0
    },
    protein: {
      type: Number,
      min: 0
    },
    carbs: {
      type: Number,
      min: 0
    },
    fat: {
      type: Number,
      min: 0
    }
  }],
  notes: {
    type: String
  },
  image: {
    type: String
  },
  tags: [{
    type: String
  }],
  isTemplate: {
    type: Boolean,
    default: false
  },
  goalProgress: {
    calories: {
      type: Number,
      default: 0
    },
    protein: {
      type: Number,
      default: 0
    },
    carbs: {
      type: Number,
      default: 0
    },
    fat: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for faster queries
mealSchema.index({ user: 1, date: -1 });

// Pre-save middleware to calculate totals from ingredients
mealSchema.pre('save', function(next) {
  if (this.ingredients && this.ingredients.length > 0) {
    this.calories = this.ingredients.reduce((sum, ing) => sum + ing.calories, 0);
    this.protein = this.ingredients.reduce((sum, ing) => sum + (ing.protein || 0), 0);
    this.carbs = this.ingredients.reduce((sum, ing) => sum + (ing.carbs || 0), 0);
    this.fat = this.ingredients.reduce((sum, ing) => sum + (ing.fat || 0), 0);
  }
  next();
});

// Method to update associated goals
mealSchema.methods.updateGoals = async function() {
  try {
    const Goal = mongoose.model('Goal');
    const goals = await Goal.find({
      user: this.user,
      type: 'diet',
      status: { $ne: 'completed' }
    });

    for (const goal of goals) {
      switch (goal.metric) {
        case 'calories':
          goal.progress += this.calories;
          break;
        case 'protein':
          goal.progress += this.protein;
          break;
        case 'carbs':
          goal.progress += this.carbs;
          break;
        case 'fat':
          goal.progress += this.fat;
          break;
      }

      if (goal.progress >= goal.target) {
        goal.status = 'completed';
        goal.completedAt = new Date();
      } else {
        goal.status = 'in-progress';
      }
      await goal.save();
    }
  } catch (err) {
    console.error('Error updating goals:', err);
  }
};

module.exports = mongoose.model('Meal', mealSchema); 