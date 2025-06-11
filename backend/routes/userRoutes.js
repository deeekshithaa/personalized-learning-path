// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

router.post('/register', async (req, res) => {
    try {
        console.log('--- REAL REGISTER ROUTE HIT ---');
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
        console.log('--- USER SAVED TO DB ---', savedUser);
        res.status(201).json({_id: savedUser.id, name: savedUser.name, email: savedUser.email});
    } catch (error) {
        console.error('--- ERROR IN REAL REGISTER ROUTE:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;