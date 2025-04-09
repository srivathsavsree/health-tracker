const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  target: {
    type: Number,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['not-started', 'in-progress', 'completed'],
    default: 'not-started'
  },
  milestones: [{
    target: Number,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Pre-save middleware to update status based on progress
goalSchema.pre('save', function(next) {
  if (this.progress >= this.target) {
    this.status = 'completed';
  } else if (this.progress > 0) {
    this.status = 'in-progress';
  } else {
    this.status = 'not-started';
  }
  next();
});

module.exports = mongoose.model('Goal', goalSchema); 