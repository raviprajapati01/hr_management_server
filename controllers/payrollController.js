const Payroll = require('../models/Payroll');
const Employee = require('../models/Employee');

// Generate payroll for an employee
exports.generatePayroll = async (req, res) => {
  const { employeeId, overtimeHours } = req.body;
  try {
    const employee = await Employee.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const salary = employee.salary;
    const overtimePay = overtimeHours * 20;  // Example: $20 per overtime hour
    const totalPay = salary + overtimePay;
    const taxDeductions = totalPay * 0.1;  // Example: 10% tax deduction
    const netPay = totalPay - taxDeductions;

    const payroll = new Payroll({
      employeeId,
      salary,
      overtimePay,
      totalPay,
      taxDeductions,
      netPay,
    });

    await payroll.save();
    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all payrolls for an employee
exports.getEmployeePayrolls = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const payrolls = await Payroll.find({ employeeId });
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
