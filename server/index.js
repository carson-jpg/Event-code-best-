require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const ticketRoutes = require('./routes/tickets');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');

// Import utilities
const { initializeSampleEvents } = require('./utils/sampleData');

const app = express();
const PORT = process.env.PORT || 3001;

// Create uploads directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
  fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true });
}

// Middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://event-code-best.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/EVENTTICKETS';

mongoose.connect(MONGODB_URI).then(() => {
  console.log('Connected to MongoDB');
  initializeSampleEvents();
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Frontend is hosted separately on Vercel, so no need to serve static files here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
