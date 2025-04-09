const mongoose = require('mongoose');

const UserAchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true
  },
  progress: {
    current: {
      type: Number,
      default: 0,
      min: 0
    },
    history: [{
      value: Number,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }]
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date
  },
  claimed: {
    type: Boolean,
    default: false
  },
  claimedAt: {
    type: Date
  },
  streak: {
    current: {
      type: Number,
      default: 0
    },
    best: {
      type: Number,
      default: 0
    },
    lastUpdated: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Ensure user can only earn each achievement once
UserAchievementSchema.index({ user: 1, achievement: 1 }, { unique: true });

// Update progress
UserAchievementSchema.methods.updateProgress = async function(value, timestamp = new Date()) {
  // Add to history
  this.progress.history.push({
    value,
    timestamp
  });

  // Update current progress
  this.progress.current = value;

  // Check if achievement is completed
  const achievement = await mongoose.model('Achievement').findById(this.achievement);
  if (achievement && value >= achievement.requirements.value) {
    this.completed = true;
    this.completedAt = timestamp;
  }

  // Update streak if applicable
  if (achievement.type === 'streak') {
    await this.updateStreak(value > 0, timestamp);
  }

  return this.save();
};

// Update streak
UserAchievementSchema.methods.updateStreak = async function(success, timestamp = new Date()) {
  const now = timestamp;
  const lastUpdate = this.streak.lastUpdated;

  if (!lastUpdate) {
    // First update
    this.streak.current = success ? 1 : 0;
  } else {
    const daysDiff = Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day
      if (success) {
        this.streak.current += 1;
        this.streak.best = Math.max(this.streak.best, this.streak.current);
      } else {
        this.streak.current = 0;
      }
    } else if (daysDiff > 1) {
      // Streak broken
      this.streak.current = success ? 1 : 0;
    }
    // If daysDiff === 0, same day, don't update streak
  }

  this.streak.lastUpdated = now;
  return this.save();
};

// Claim achievement rewards
UserAchievementSchema.methods.claim = async function() {
  if (!this.completed || this.claimed) {
    throw new Error('Achievement cannot be claimed');
  }

  const achievement = await mongoose.model('Achievement').findById(this.achievement);
  if (!achievement) {
    throw new Error('Achievement not found');
  }

  // Check if achievement is still available
  if (!(await achievement.isAvailable())) {
    throw new Error('Achievement is no longer available');
  }

  this.claimed = true;
  this.claimedAt = new Date();

  // Add points to user
  const user = await mongoose.model('User').findById(this.user);
  if (user) {
    user.points = (user.points || 0) + achievement.points;
    await user.save();
  }

  return this.save();
};

// Static method to get user's achievement progress
UserAchievementSchema.statics.getUserProgress = async function(userId) {
  const achievements = await mongoose.model('Achievement').find({ isActive: true });
  const userAchievements = await this.find({ user: userId }).populate('achievement');

  return achievements.map(achievement => {
    const userAchievement = userAchievements.find(
      ua => ua.achievement && ua.achievement._id.toString() === achievement._id.toString()
    );

    return {
      achievement,
      progress: userAchievement ? userAchievement.progress.current : 0,
      completed: userAchievement ? userAchievement.completed : false,
      claimed: userAchievement ? userAchievement.claimed : false,
      streak: userAchievement ? userAchievement.streak : { current: 0, best: 0 }
    };
  });
};

module.exports = mongoose.model('UserAchievement', UserAchievementSchema);