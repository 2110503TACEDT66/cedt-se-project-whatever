const Booking = require('../models/Booking');
const Dentist = require('../models/Dentist');
const Feedback = require('../models/Feedback');

//@desc     Get all feedbacks
//@route    GET /api/v1/feedbacks
//@access   Private
exports.getFeedbacks = async (req, res, next) => {
  try {
    let feedbacks;
    if (req.params.dentistId) {
      feedbacks = await Feedback.find({ dentist: req.params.dentistId });
    } else {
      feedbacks = await Feedback.find();
    }

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Cannot find feedbacks' });
  }
};

//@desc     Get single feedback
//@route    GET /api/v1/feedbacks/:feedbackId
//@access   Public
exports.getFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.feedbackId);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: `No feedback with the id of ${req.params.feedbackId}`,
      });
    }

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot find feedback' });
  }
};
