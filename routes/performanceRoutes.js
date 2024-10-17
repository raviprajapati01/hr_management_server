const express = require('express');
const { setPerformanceGoal, updatePerformanceReview, getEmployeePerformance } = require('../controllers/performanceController');
const router = express.Router();

router.post('/performance/setgoal', setPerformanceGoal);
router.put('/performance/update/:id', updatePerformanceReview);
router.get('/performance/:employeeId', getEmployeePerformance);

module.exports = router;
