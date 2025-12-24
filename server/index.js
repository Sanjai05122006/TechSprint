const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/contact', require('./routes/contactRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('EduPrep Portal API is running...');
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/eduprep')
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch(err => {
        console.error('⚠️ MongoDB Connection Error. Please ensure MongoDB is running for full functionality.');
    });

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
