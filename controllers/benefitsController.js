const Benefits = require('../models/Benefits');

// Assign or update employee benefits
exports.assignBenefits = async (req, res) => {
  const { employeeId, healthInsurance, retirementPlan, leaveDays } = req.body;
  try {
    const benefits = await Benefits.findOne({ employeeId });
    if (!benefits) {
      const newBenefits = new Benefits({ employeeId, healthInsurance, retirementPlan, leaveDays });
      await newBenefits.save();
      return res.status(201).json(newBenefits);
    }

    benefits.healthInsurance = healthInsurance;
    benefits.retirementPlan = retirementPlan;
    benefits.leaveDays = leaveDays;

    await benefits.save();
    res.json(benefits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get benefits for an employee
exports.getEmployeeBenefits = async (req, res) => {
  const { employeeId } = req.params;
  try {
    const benefits = await Benefits.findOne({ employeeId });
    res.json(benefits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
