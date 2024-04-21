const Dentist = require("../models/Dentist");
const Feedback = require("../models/Feedback");

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
      .json({ success: false, message: "Cannot find feedbacks" });
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
      .json({ success: false, message: "Cannot find feedback" });
  }
};

//@desc     Add feedback
//@route    POST /api/v1/dentists/:dentistId/feedbacks
//@access   Private
exports.addFeedback = async (req, res, next) => {
  try {
    //Throw error if multiple feedbacks or receptionist.
    const { comment, rating } = req.body;
    const existedFeedback = await Feedback.find({
      user: req.user.id,
      dentist: req.params.dentistId,
    });
    if (req.user.role !== "user") {
      return res.status(400).json({
        success: false,
        message: `This account cannot add feedback`,
      });
    }
    if (existedFeedback.length >= 1) {
      return res.status(400).json({
        success: false,
        message: `The user with ID ${req.user.id} has already add feedback on the dentist of ID ${req.params.dentistId}`,
      });
    }

    //Find dentist Object
    const dentist = await Dentist.findById(req.params.dentistId);

    if (!dentist) {
      return res.status(404).json({
        success: false,
        message: `No dentist with the id of ${req.params.dentistId}`,
      });
    }

    //add user Id and dentist Id to req.body
    req.body.dentist = req.params.dentistId;
    req.body.user = req.user.id;

    const feedback = await Feedback.create(req.body);

    res.status(200).json({
      success: true,
      data: feedback,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Cannot add feedback" });
  }
};

//@desc     Update feedback session
//@route    PUT /api/v1/feedbacks/:id
//@access   Private
exports.updateFeedback = async (req, res, next) => {
  try {
    let feedback = await Feedback.findById(req.params.feedbackId);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: `No feedback with the id of ${req.params.feedbackId}`,
      });
    }

    //Make sure user is the feedback owner
    if (feedback.user.toString() !== req.user.id && req.user.role === "user") {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this feedback session`,
      });
    }

    feedback = await feedback.findByIdAndUpdate(
      req.params.feedbackId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Cannot update feedback Session" });
  }
};

//@desc     Delete feedback session
//@route    DELETE /api/v1/feedbacks/:id
//@access   Private
exports.deletefeedback = async (req, res, next) => {
  try {
    const feedback = await feedback.findById(req.params.feedbackId);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: `No feedback with the id of ${req.params.feedbackId}`,
      });
    }

    //Make sure user is the feedback owner
    if (
      feedback.user.toString() !== req.user.id &&
      req.user.role !== "admin" &&
      req.user.role !== "receptionist"
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this feedback`,
      });
    }

    await feedback.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Cannot delete feedback" });
  }
};
