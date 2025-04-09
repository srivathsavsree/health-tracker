const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['fitness', 'nutrition', 'sleep', 'water', 'mood', 'streak', 'special']
  },
  rarity: {
    type: String,
    required: true,
    enum: ['common', 'rare', 'epic', 'legendary']
  },
  icon: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    min: 0
  },
  requirements: {
    type: [{
      type: {
        type: String,
        required: true,
        enum: ['achievement', 'points', 'activity']
      },
      value: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      },
      description: String
    }],
    validate: [arr => arr.length > 0, 'Badge must have at least one requirement']
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
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Static method to check if a badge is available
BadgeSchema.statics.isAvailable = async function(badgeId) {
  const badge = await this.findById(badgeId);
  if (!badge) return false;
  if (!badge.isActive) return false;
  
  // Check if limited time badge is still available
  if (badge.isLimited && badge.availableUntil) {
    if (new Date() > badge.availableUntil) return false;
  }
  
  // Check supply limit if applicable
  if (badge.maxSupply) {
    const count = await mongoose.model('UserBadge').countDocuments({ badge: badgeId });
    if (count >= badge.maxSupply) return false;
  }
  
  return true;
};

// Method to check if requirements are met
BadgeSchema.methods.checkRequirements = async function(userId) {
  const User = mongoose.model('User');
  const UserAchievement = mongoose.model('UserAchievement');
  
  for (const req of this.requirements) {
    switch (req.type) {
      case 'achievement':
        const achievement = await UserAchievement.findOne({
          user: userId,
          achievement: req.value,
          completed: true
        });
        if (!achievement) return false;
        break;
        
      case 'points':
        const user = await User.findById(userId);
        if (!user || user.points < req.value) return false;
        break;
        
      case 'activity':
        // Custom activity requirements can be implemented here
        break;
    }
  }
  
  return true;
};

module.exports = mongoose.model('Badge', BadgeSchema); 