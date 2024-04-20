const express = require('express');

const {
  getFeedbacks,
  addFeedback,
  getFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbacks');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router.route('/').get(protect, getFeedbacks).post(protect, addFeedback);
router
  .route('/:feedbackId')
  .get(protect, authorize('admin', 'receptionist'), getFeedback)
  .post(protect, authorize('admin', 'receptionist'), addFeedback)
  .put(protect, updateFeedback)
  .delete(protect, deleteFeedback);

module.exports = router;
