const express = require('express');

const {
  getBookings,
  addBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require('../controllers/bookings');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(protect, getBookings).post(protect, addBooking);
router
  .route('/:bookingId')
  .get(protect, authorize('admin', 'receptionist'), getBooking)
  .post(protect, authorize('admin', 'receptionist'), addBooking)
  .put(protect, updateBooking)
  .delete(protect, deleteBooking);

module.exports = router;
