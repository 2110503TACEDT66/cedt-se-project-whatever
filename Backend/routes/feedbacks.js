const express = require("express");

const {
  getFeedbacks,
  getFeedback,
  addFeedback,
} = require("../controllers/feedbacks");

const router = express.Router({ mergeParams: true });
const { protect, authorize } = require("../middleware/auth");

router.route("/").get(getFeedbacks).post(protect, addFeedback);
router.route("/:feedbackId").get(getFeedback);

module.exports = router;
