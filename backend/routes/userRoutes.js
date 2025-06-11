const express = require('express');
const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  console.log('Register request body:', req.body);
  res.json({ message: 'User registration endpoint hit successfully!' });
});

// @route   POST /api/users/login
// @desc    Authenticate a user and get token
// @access  Public
router.post('/login', (req, res) => {
  console.log('Login request body:', req.body);
  res.json({ message: 'User login endpoint hit successfully!', token: 'fake-jwt-token' });
});

// This is the most important line!
// It makes the router available to other files.
module.exports = router;