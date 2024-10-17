const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Your user model
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route for user signup
router.post('/auth/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});




// Route for user login
router.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = jwt.sign(
      { id: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET || employee_mg_system, // Secret key
    );

    console.log("token is form login in server: ", token)

    res.send({ message: 'Login successful', token }); // Send the token back
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
