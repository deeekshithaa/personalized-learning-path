const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { protect } = require('../middleware/authMiddleware'); // ✅ FIX #1: Import protect middleware

// --- REGISTER ROUTE ---
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please enter all fields' });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User with that email already exists' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();

        res.status(201).json({
            _id: savedUser.id,
            name: savedUser.name,
            email: savedUser.email,
        });
    } catch (error) {
        console.error('REGISTER ERROR:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const payload = { user: { id: user.id } };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// --- UPDATE PROFILE ROUTE ---
router.put('/profile', protect, async (req, res) => {
    try {
        const { goal, skillLevel, learningStyle } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { goal, skillLevel, learningStyle },
            { new: true }
        ).select('-password');

        res.json(updatedUser);
    } catch (error) {
        console.error('PROFILE UPDATE ERROR:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router; 
