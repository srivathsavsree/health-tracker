const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/achievements', require('./routes/achievements'));
app.use('/api/badges', require('./routes/badges'));
app.use('/api/sleep', require('./routes/sleep'));
app.use('/api/water', require('./routes/water'));
app.use('/api/mood', require('./routes/mood'));
app.use('/api/goals', require('./routes/goals'));
app.use('/api/meals', require('./routes/meals'));
app.use('/api/activities', require('./routes/activities'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app; 