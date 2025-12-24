const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    options: [{
        text: { type: String, required: true },
        isCorrect: { type: Boolean, required: true }
    }],
    category: { type: String, required: true }, // DSA, Aptitude, OS, etc.
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], required: true },
    explanation: { type: String },
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
