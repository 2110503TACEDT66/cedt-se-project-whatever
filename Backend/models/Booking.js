const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  dentist: {
    type: mongoose.Schema.ObjectId,
    ref: 'Dentist',
    required: true,
  },
  symptom: {
    type: String,
    required: true,
  },
  reqType: {
    type: String,
    enum: ['checkup', 'cure'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
