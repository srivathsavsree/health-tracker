const mongoose = require('mongoose');

const healthSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date: {
        type: Date,
        default: Date.now
    },
    nutrition: {
        calories: {
            type: Number,
            default: 0
        },
        meals: [{
            name: String,
            calories: Number,
            time: Date
        }]
    },
    sleep: {
        hours: {
            type: Number,
            default: 0
        },
        quality: {
            type: Number,
            min: 1,
            max: 5
        },
        startTime: Date,
        endTime: Date
    },
    activity: {
        type: [{
            name: String,
            duration: Number, // in minutes
            caloriesBurned: Number
        }],
        default: []
    },
    goals: {
        dailyCalories: {
            type: Number,
            default: 2000
        },
        sleepHours: {
            type: Number,
            default: 8
        },
        activityMinutes: {
            type: Number,
            default: 30
        }
    }
}, {
    timestamps: true
});

const Health = mongoose.model('Health', healthSchema);
module.exports = Health; 