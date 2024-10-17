const Performance = require('../models/Performance');

// Set performance goals
exports.setPerformanceGoal = async (req, res) => {
  const { employeeId, goal } = req.body;
  try {
    const newGoal = new Performance({ employeeId, goal });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update performance review
exports.updatePerformanceReview = async (req, res) => {
  const { id } = req.params;
  const { review } = req.body;
  try {
    const performance = await Performance.findById(id);
    if (!performance) return res.status(404).json({ message: 'Performance record not found' });

    performance.performanceReview = review;
    await performance.save();
    res.json(performance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all performance records for an employee
exports.getEmployeePerformance = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const performanceRecords = await Performance.find({ employeeId });
    res.json(performanceRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
