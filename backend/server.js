const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const courseRoutes = require('./routes/courseRoutes');
const studentRoutes = require('./routes/studentRoutes');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:3001' }));
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT1 || 5012;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));