// backend/server.js
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const express = require('express');
const cors = require('cors'); // We are still using this
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');

connectDB();

const app = express();
const PORT = process.env.PORT || 8080;


const corsOptions = {
  origin: 'http://localhost:8084', // Allow requests from your frontend's origin
  optionsSuccessStatus: 200 
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is now running on port: ${PORT}`);
});

app.listen(PORT, () => {
    console.log('----------------------------------------------------');
    console.log('--- SERVER VERSION 3.0 --- LISTENING FOR REQUESTS ---');
    console.log(`--- http://localhost:${PORT} ---`);
    console.log('----------------------------------------------------');
});