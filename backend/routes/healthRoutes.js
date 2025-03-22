const express = require('express');
const router = express.Router();
const {
    createHealthRecord,
    getHealthRecords,
    getHealthRecord,
    updateHealthRecord,
    deleteHealthRecord,
    getHealthStats
} = require('../controllers/healthController');
const { protect } = require('../middleware/authMiddleware');

// All routes are protected
router.use(protect);

router.route('/')
    .post(createHealthRecord)
    .get(getHealthRecords);

router.get('/stats', getHealthStats);

router.route('/:id')
    .get(getHealthRecord)
    .put(updateHealthRecord)
    .delete(deleteHealthRecord);

module.exports = router; 