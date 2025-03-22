const Health = require('../models/healthModel');

// @desc    Create health record
// @route   POST /api/health
// @access  Private
const createHealthRecord = async (req, res) => {
    try {
        const { nutrition, sleep, activity, goals } = req.body;
        
        const healthRecord = await Health.create({
            user: req.user._id,
            nutrition,
            sleep,
            activity,
            goals
        });

        res.status(201).json(healthRecord);
    } catch (error) {
        res.status(400);
        throw new Error('Invalid health data');
    }
};

// @desc    Get user's health records
// @route   GET /api/health
// @access  Private
const getHealthRecords = async (req, res) => {
    try {
        const records = await Health.find({ user: req.user._id }).sort({ date: -1 });
        res.json(records);
    } catch (error) {
        res.status(400);
        throw new Error('Error fetching health records');
    }
};

// @desc    Get single health record
// @route   GET /api/health/:id
// @access  Private
const getHealthRecord = async (req, res) => {
    try {
        const record = await Health.findById(req.params.id);
        
        if (!record) {
            res.status(404);
            throw new Error('Health record not found');
        }

        // Make sure user owns health record
        if (record.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        res.json(record);
    } catch (error) {
        res.status(400);
        throw new Error('Error fetching health record');
    }
};

// @desc    Update health record
// @route   PUT /api/health/:id
// @access  Private
const updateHealthRecord = async (req, res) => {
    try {
        const record = await Health.findById(req.params.id);

        if (!record) {
            res.status(404);
            throw new Error('Health record not found');
        }

        // Make sure user owns health record
        if (record.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        const updatedRecord = await Health.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedRecord);
    } catch (error) {
        res.status(400);
        throw new Error('Error updating health record');
    }
};

// @desc    Delete health record
// @route   DELETE /api/health/:id
// @access  Private
const deleteHealthRecord = async (req, res) => {
    try {
        const record = await Health.findById(req.params.id);

        if (!record) {
            res.status(404);
            throw new Error('Health record not found');
        }

        // Make sure user owns health record
        if (record.user.toString() !== req.user._id.toString()) {
            res.status(401);
            throw new Error('Not authorized');
        }

        await record.remove();
        res.json({ message: 'Health record removed' });
    } catch (error) {
        res.status(400);
        throw new Error('Error deleting health record');
    }
};

// @desc    Get user's health statistics
// @route   GET /api/health/stats
// @access  Private
const getHealthStats = async (req, res) => {
    try {
        const stats = await Health.aggregate([
            {
                $match: { user: req.user._id }
            },
            {
                $group: {
                    _id: null,
                    avgCalories: { $avg: '$nutrition.calories' },
                    avgSleepHours: { $avg: '$sleep.hours' },
                    totalActivities: { $sum: { $size: '$activity' } }
                }
            }
        ]);

        res.json(stats[0] || {
            avgCalories: 0,
            avgSleepHours: 0,
            totalActivities: 0
        });
    } catch (error) {
        res.status(400);
        throw new Error('Error fetching health statistics');
    }
};

module.exports = {
    createHealthRecord,
    getHealthRecords,
    getHealthRecord,
    updateHealthRecord,
    deleteHealthRecord,
    getHealthStats
}; 