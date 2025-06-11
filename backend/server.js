// backend/server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // <-- ADD THIS BACK
const connectDB = require('./config/db'); // <-- ADD THIS BACK
const userRoutes = require('./routes/userRoutes');

connectDB(); // <-- ADD THIS BACK

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.listen(PORT, () => console.log(`Server with DB connection attempt running on ${PORT}`));