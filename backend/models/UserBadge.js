const mongoose = require('mongoose');

const UserBadgeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  badge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Badge',
    required: true
  },
  isEquipped: {
    type: Boolean,
    default: false
  },
  earnedAt: {
    type: Date,
    default: Date.now
  },
  history: [{
    action: {
      type: String,
      enum: ['earned', 'equipped', 'unequipped']
    },
    date: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
});

// Ensure a user can only earn each badge once
UserBadgeSchema.index({ user: 1, badge: 1 }, { unique: true });

// Method to equip a badge
UserBadgeSchema.methods.equip = async function() {
  // First unequip any other badges of the same category
  const badge = await mongoose.model('Badge').findById(this.badge);
  if (!badge) throw new Error('Badge not found');

  await this.constructor.updateMany(
    { 
      user: this.user,
      _id: { $ne: this._id },
      badge: { $in: await mongoose.model('Badge').find({ category: badge.category }).distinct('_id') }
    },
    { isEquipped: false }
  );

  this.isEquipped = true;
  this.history.push({
    action: 'equipped',
    date: new Date()
  });
  return this.save();
};

// Method to unequip a badge
UserBadgeSchema.methods.unequip = function() {
  this.isEquipped = false;
  this.history.push({
    action: 'unequipped',
    date: new Date()
  });
  return this.save();
};

// Static method to get user's equipped badges
UserBadgeSchema.statics.getEquippedBadges = function(userId) {
  return this.find({ user: userId, isEquipped: true })
    .populate('badge')
    .sort('badge.category');
};

// Static method to get user's badge collection
UserBadgeSchema.statics.getUserCollection = function(userId) {
  return this.find({ user: userId })
    .populate('badge')
    .sort('-earnedAt');
};

module.exports = mongoose.model('UserBadge', UserBadgeSchema); 