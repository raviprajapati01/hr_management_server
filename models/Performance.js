const mongoose = require('mongoose');

const performanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  goal: { type: String, required: true },
  progress: { type: String, default: 'In Progress' }, // In Progress, Completed
  performanceReview: { type: String, default: 'Not Evaluated' },
}, { timestamps: true });

module.exports = mongoose.model('Performance', performanceSchema);
