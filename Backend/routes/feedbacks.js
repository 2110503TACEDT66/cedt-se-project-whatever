const express = require('express');

const { getFeedbacks, getFeedback } = require('../controllers/feedbacks');

const router = express.Router({ mergeParams: true });

router.route('/').get(getFeedbacks);
router.route('/:feedbackId').get(getFeedback);

module.exports = router;
