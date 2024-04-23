const express = require('express');

const {
  getFeedbacks,
  getFeedback,
  addFeedback,
  updateFeedback,
  deletefeedback,
} = require("../controllers/feedbacks");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getFeedbacks).post(protect, addFeedback);
router
  .route("/:feedbackId")
  .get(getFeedback)
  .put(updateFeedback)
  .delete(deletefeedback);

module.exports = router;
