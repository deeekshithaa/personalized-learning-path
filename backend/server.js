// 1. Importing Dependencies
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Allows us to use environment variables

// 2. Creating Express App
const app = express();
const PORT = process.env.PORT || 5001; // Use port from .env 

// 3. Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Allow the server to accept JSON in the body of requestscd backend

// 4. Import Routes
const userRoutes = require('./routes/userRoutes');

// 5. Use Routes
app.use('/api/users', userRoutes);

// 6. Basic Route for testing server is up
app.get('/', (req, res) => {
  res.send('Hello from the Personalized Learning Path API!');
});

// 7. Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});