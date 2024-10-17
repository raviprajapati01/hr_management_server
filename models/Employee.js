const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  performanceHistory: [{
    date: {
      type: Date,
      default: Date.now,
    },
    rating: {
      type: Number,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating Employee model
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
