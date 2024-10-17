const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  salary: { type: Number, required: true },
  overtimePay: { type: Number, default: 0 },
  totalPay: { type: Number, required: true },
  taxDeductions: { type: Number, required: true },
  netPay: { type: Number, required: true },
  payDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
