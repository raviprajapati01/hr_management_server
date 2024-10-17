const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true,
  },
  checkInTime: { type: Date, required: true },
  checkOutTime: { type: Date },
  isOvertime: { type: Boolean, default: false },
  totalHoursWorked: { type: Number, default: 0 },
  leaveType: {
    type: String,
    enum: ['Vacation', 'Sick', 'Personal'],
    default: null,
  },
  leaveStatus: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
