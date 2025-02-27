const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    totalScore: {
        type: Number,
        default: 0
    },
    bonusesReceived: {
        type: [Number], 
        default: []
    },
    prizesWon: {
        type: [String], 
        default: []
    }
}, { timestamps: true });

module.exports = mongoose.model('Score', scoreSchema);
