const Attendance = require('../models/Attendance');
const Employee = require('../models/Employee');

// Record check-in time
exports.checkIn = async (req, res) => {
  const { employeeId } = req.body;
  try {
    const newAttendance = new Attendance({
      employeeId,
      checkInTime: new Date(),
    });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Record check-out time and calculate hours worked
exports.checkOut = async (req, res) => {
  const { id } = req.params;
  try {
    const attendance = await Attendance.findById(id);
    if (!attendance) return res.status(404).json({ message: 'Attendance not found' });

    attendance.checkOutTime = new Date();
    const diff = Math.abs(attendance.checkOutTime - attendance.checkInTime) / 36e5;
    attendance.totalHoursWorked = diff;
    attendance.isOvertime = diff > 8;

    await attendance.save();
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Request leave
exports.requestLeave = async (req, res) => {
  const { employeeId, leaveType } = req.body;
  try {
    const newLeave = new Attendance({
      employeeId,
      leaveType,
      leaveStatus: true,
    });
    await newLeave.save();
    res.status(201).json(newLeave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all attendance records for an employee
exports.getEmployeeAttendance = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const attendanceRecords = await Attendance.find({ employeeId });
    res.json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
