// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware');

// 1. REGISTER
router.post('/register', async (req, res) => { /* ... your correct register code ... */ });

// 2. LOGIN
router.post('/login', async (req, res) => { /* ... your correct login code ... */ });

// 3. UPDATE PROFILE
router.put('/profile', protect, async (req, res) => { /* ... your correct profile update code ... */ });

// 4. GET LEARNING PATH
router.get('/learning-path', protect, async (req, res) => {
    try {
        const user = req.user;
        if (!user.goal || !user.skillLevel) {
            return res.status(400).json({ message: 'User profile is not complete. Please complete the onboarding.' });
        }
        const mlServiceResponse = await axios.post('http://127.0.0.1:5001/recommend', {
            goal: user.goal,
            skillLevel: user.skillLevel,
            learningStyle: user.learningStyle
        });
        res.json(mlServiceResponse.data);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ message: 'AI service is currently unavailable.' });
        }
        console.error('LEARNING PATH ERROR:', error);
        res.status(500).json({ message: 'Error fetching learning path' });
    }
});

module.exports = router;