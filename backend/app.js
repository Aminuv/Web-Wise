const express = require('express');
const connectToDb  = require('./config/connectToDb');
require('dotenv').config();


// Import the database connection
connectToDb();

// Create an Express application
const app = express();


// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoute'));

// Run the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${process.env.NODE_ENV} mode on port ${PORT}`));
