const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
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
    enum: ['walking', 'running', 'cycling', 'swimming', 'gym', 'yoga', 'other'],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    required: true,
    min: 1
  },
  calories: {
    type: Number,
    required: true,
    min: 0
  },
  distance: {
    type: Number, // in kilometers
    required: function() {
      return ['walking', 'running', 'cycling'].includes(this.type);
    },
    min: 0
  },
  intensity: {
    type: String,
    enum: ['light', 'moderate', 'vigorous'],
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ['completed', 'in-progress', 'planned'],
    default: 'completed'
  },
  goalProgress: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Add index for faster queries
activitySchema.index({ user: 1, date: -1 });

// Pre-save middleware to calculate calories if not provided
activitySchema.pre('save', function(next) {
  if (!this.calories) {
    // Basic calorie calculation based on duration and intensity
    const MET = {
      light: 3,
      moderate: 5,
      vigorous: 8
    };
    // Assuming average weight of 70kg, formula: MET * weight(kg) * duration(hours)
    this.calories = Math.round(MET[this.intensity] * 70 * (this.duration / 60));
  }
  next();
});

// Method to update associated goals
activitySchema.methods.updateGoals = async function() {
  try {
    const Goal = mongoose.model('Goal');
    const goals = await Goal.find({
      user: this.user,
      type: 'activity',
      status: { $ne: 'completed' }
    });

    for (const goal of goals) {
      if (goal.type === this.type) {
        goal.progress += this.duration;
        if (goal.progress >= goal.target) {
          goal.status = 'completed';
          goal.completedAt = new Date();
        } else {
          goal.status = 'in-progress';
        }
        await goal.save();
      }
    }
  } catch (err) {
    console.error('Error updating goals:', err);
  }
};

module.exports = mongoose.model('Activity', activitySchema); 