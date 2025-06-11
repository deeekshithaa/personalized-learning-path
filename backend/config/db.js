// backend/config/db.js

const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    console.log('--- ATTEMPTING TO CONNECT TO MONGODB ---');
    console.log(`Using MONGO_URI: ${process.env.MONGO_URI}`); 

    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, 
            socketTimeoutMS: 45000,
        });
        console.log(`\n✅ ✅ ✅  MongoDB Connected: ${conn.connection.host} ✅ ✅ ✅\n`);
    } catch (err) {
        console.error('\n❌ ❌ ❌ DATABASE CONNECTION FAILED ❌ ❌ ❌');
        console.error('Full Error Object:', err);
        console.log('\nServer will continue running, but database operations will fail.');
    }
};

module.exports = connectDB;