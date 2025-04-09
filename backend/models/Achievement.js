const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fitness', 'nutrition', 'sleep', 'water', 'mood', 'streak', 'social', 'special']
  },
  type: {
    type: String,
    required: true,
    enum: ['oneTime', 'repeatable', 'progressive', 'streak', 'milestone']
  },
  requirements: {
    metric: {
      type: String,
      required: true,
      enum: ['steps', 'calories', 'distance', 'workouts', 'meals', 'water', 'sleep', 'mood', 'points', 'custom']
    },
    value: {
      type: Number,
      required: true,
      min: 0
    },
    timeframe: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'allTime'],
      default: 'allTime'
    },
    customCheck: {
      type: String,
      validate: {
        validator: function(v) {
          // Custom check must be a valid function string
          try {
            new Function('user', 'data', v);
            return true;
          } catch(e) {
            return false;
          }
        },
        message: 'Custom check must be a valid function'
      }
    }
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  icon: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isLimited: {
    type: Boolean,
    default: false
  },
  availableUntil: {
    type: Date
  },
  maxSupply: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

// Check if achievement is available
AchievementSchema.methods.isAvailable = async function() {
  if (!this.isActive) return false;
  
  if (this.isLimited) {
    // Check time limit
    if (this.availableUntil && new Date() > this.availableUntil) {
      return false;
    }
    
    // Check supply limit
    if (this.maxSupply) {
      const count = await mongoose.model('UserAchievement').countDocuments({ 
        achievement: this._id,
        completed: true
      });
      if (count >= this.maxSupply) return false;
    }
  }
  
  return true;
};

// Check if user meets requirements
AchievementSchema.methods.checkRequirements = async function(userId, data = {}) {
  const { metric, value, timeframe, customCheck } = this.requirements;
  
  // Get relevant user data based on metric and timeframe
  let userValue = 0;
  
  switch(metric) {
    case 'custom':
      if (!customCheck) return false;
      try {
        const checkFn = new Function('user', 'data', customCheck);
        return await checkFn(userId, data);
      } catch(e) {
        console.error('Custom check error:', e);
        return false;
      }
    
    // Add other metric checks here
    default:
      if (data[metric]) {
        userValue = data[metric];
      }
  }
  
  return userValue >= value;
};

module.exports = mongoose.model('Achievement', AchievementSchema); 