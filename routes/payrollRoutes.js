const express = require('express');
const { generatePayroll, getEmployeePayrolls } = require('../controllers/payrollController');
const router = express.Router();

router.post('/payroll/generate', generatePayroll);
router.get('/payroll/:employeeId', getEmployeePayrolls);

module.exports = router;
