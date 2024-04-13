const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  bookingDate: {
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
    default: 'checkup'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
