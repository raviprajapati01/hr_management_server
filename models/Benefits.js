const mongoose = require('mongoose');

const benefitsSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  healthInsurance: { type: Boolean, default: false },
  retirementPlan: { type: Boolean, default: false },
  leaveDays: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Benefits', benefitsSchema);
