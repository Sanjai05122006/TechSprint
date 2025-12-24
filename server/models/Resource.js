const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    type: { type: String, enum: ['PDF', 'PPT', 'Doc', 'Link'], required: true },
    category: {
        subject: String,
        semester: Number,
        examType: { type: String, enum: ['End-Sem', 'CAT', 'GATE', 'Placements', 'General'] }
    },
    tags: [String],
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    reports: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        reason: String,
        date: { type: Date, default: Date.now }
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', resourceSchema);
