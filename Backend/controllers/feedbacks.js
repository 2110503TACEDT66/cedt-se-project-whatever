const Dentist = require("../models/Dentist");
const Feedback = require("../models/Feedback");
const mongoose = require("mongoose");

//@desc     Get all feedbacks
//@route    GET /api/v1/feedbacks
//@access   Private
exports.getFeedbacks = async (req, res, next) => {
  let query;
  let avgRating; // Declaring avgRating outside the if block

  if (req.params.dentistId) {
    // Calculate average rating
    avgRating = await Feedback.aggregate([
      {
        $match: { dentist: new mongoose.Types.ObjectId(req.params.dentistId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    query = Feedback.find({ dentist: req.params.dentistId });
  } else {
    if (req.query.booking)
      query = Feedback.find({ booking: req.query.booking });
    else query = Feedback.find();
  }

  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 4;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  try {
    const total = await Feedback.countDocuments();
    query = query.skip(startIndex).limit(limit);

    const feedbacks = await query;

    const pagination = {};

    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit,
      };
    }

    res.status(200).json({
      success: true,
      count: feedbacks.length,
      pagination,
      averageRating:
        avgRating && avgRating[0] ? avgRating[0].averageRating : null, // Conditional check for avgRating
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

    feedback = await Feedback.findByIdAndUpdate(
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
    const feedback = await Feedback.findById(req.params.feedbackId);

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
