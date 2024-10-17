// controllers/profileController.js

const User = require('../models/User'); // Assuming you have a User model

// Fetch user profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you're using a token-based authentication and user ID is available in req.user

    const user = await User.findById(userId).select('-password'); // Exclude the password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Update user profile (optional)
exports.updateUserProfile = async (req, res) => {
  const { username, email, phone } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user details
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
