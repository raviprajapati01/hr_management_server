const Employee = require('../models/Employee');

// Add a new employee
exports.addEmployee = async (req, res) => {
  const { name, email, phone, jobRole, salary } = req.body;
  try {
    const newEmployee = new Employee({ name, email, phone, jobRole, salary });
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).send('Server error');
  }
};

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');
    res.json(employee);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  const { name, email, phone, jobRole, salary } = req.body;
  try {
    let employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');

    employee.name = name;
    employee.email = email;
    employee.phone = phone;
    employee.jobRole = jobRole;
    employee.salary = salary;

    await employee.save();
    res.json(employee);
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors });
    }
    res.status(500).send('Server error');
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');
    res.json({ msg: 'Employee deleted' });
  } catch (error) {
    res.status(500).send('Server error');
  }
};
