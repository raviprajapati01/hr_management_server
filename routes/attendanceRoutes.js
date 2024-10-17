const express = require('express');
const { checkIn, checkOut, requestLeave, getEmployeeAttendance } = require('../controllers/attendanceController');
const router = express.Router();

router.post('/attendance/checkin', checkIn);
router.put('/attendance/checkout/:id', checkOut);
router.post('/attendance/leave', requestLeave);
router.get('/attendance/:employeeId', getEmployeeAttendance);

module.exports = router;
