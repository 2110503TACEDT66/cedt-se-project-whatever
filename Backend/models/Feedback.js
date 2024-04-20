const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    dentist: {
        type: mongoose.Schema.ObjectId,
        ref: 'Dentist',
        required: true
    },
    feedbacks: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true
        },
        comment: {
            type: String,
            required: [true, 'Please add a comment']
        },
        rating: {
            type: Number,
            min: 1,
            max: 5,
            required: [true, 'Please add a rating']
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

feedbackSchema.index({ dentist: 1 });

feedbackSchema.pre('find', function() {
    this.populate({
        path: 'feedbacks.user',
        select: 'name'
    });
});

module.exports = mongoose.model('Feedback', feedbackSchema);
