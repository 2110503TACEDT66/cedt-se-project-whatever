const mongoose = require('mongoose');

const FeedbackSchema = new mongoose.Schema({
  dentist: {
    type: mongoose.Schema.ObjectId,
    ref: 'Dentist',
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  comment: {
    type: String,
    required: [true, 'Please add a comment'],
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please add a rating'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

FeedbackSchema.index({ dentist: 1 });

FeedbackSchema.pre('find', function () {
  this.populate({
    path: 'user',
    select: 'name',
  });
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
