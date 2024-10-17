const express = require('express');
const { assignBenefits, getEmployeeBenefits } = require('../controllers/benefitsController');
const router = express.Router();

router.post('/benefits/assign', assignBenefits);
router.get('/benefits/:employeeId', getEmployeeBenefits);

module.exports = router;
