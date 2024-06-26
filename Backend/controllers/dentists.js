const Dentist = require('../models/Dentist');
const Feedback = require('../models/Feedback');

//@desc     Get all dentists
//@route    GET /api/v1/dentists
//@access   Public
exports.getDentists = async (req, res, next) => {
  let query;

  //Copy req.query
  const reqQuery = { ...req.query };

  //Fields to exclude
  const removeFields = ['select', 'sort', 'page', 'limit'];

  //Loop over remove fields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);
  console.log(reqQuery);

  //Create operators ($gt, $gte, etc)
  let queryStr = JSON.stringify(reqQuery);
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //finding resource
  query = Dentist.find(JSON.parse(queryStr)).populate('bookings');

  //Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }
  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('name');
  }

  //Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    const total = await Dentist.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Executing query
    const dentists = await query;
    // Fetch average ratings for each dentist
    const dentistIds = dentists.map((dentist) => dentist._id);
    const avgRatings = await Promise.all(
      dentistIds.map(async (dentistId) => {
        const avgRating = await Feedback.aggregate([
          {
            $match: { dentist: dentistId },
          },
          {
            $group: {
              _id: null,
              averageRating: { $avg: '$rating' },
            },
          },
        ]);
        return {
          dentistId,
          averageRating:
            avgRating && avgRating[0] ? avgRating[0].averageRating : null,
        };
      })
    );

    // Create a map of dentistId to average rating for quick lookup
    const avgRatingsMap = avgRatings.reduce((acc, curr) => {
      acc[curr.dentistId] = curr.averageRating;
      return acc;
    }, {});

    // Attach average rating to each dentist
    const dentistsWithAvgRating = dentists.map((dentist) => ({
      ...dentist.toObject(),
      averageRating: avgRatingsMap[dentist._id], // =====
    }));

    //Pagination result
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
      count: dentistsWithAvgRating.length,
      pagination,
      data: dentistsWithAvgRating,
    });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Get single dentist
//@route    GET /api/v1/dentists/:id
//@access   Public
exports.getDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findById(req.params.id);

    if (!dentist) {
      return res.status(400).json({
        success: false,
        message: `Dentist not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: dentist });
  } catch (err) {
    res.status(400).json({ success: false });
  }
};

//@desc     Add new dentist
//@route    POST /api/v1/dentists
//@access   Private
exports.addDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.create(req.body);
    res.status(201).json({ success: true, data: dentist });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Cannot add dentist`,
    });
  }
};

//@desc     Update dentist
//@route    PUT /api/v1/dentists/:id
//@access   Private
exports.updateDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!dentist) {
      return res.status(400).json({
        success: false,
        message: `Dentist not found with id of ${req.params.id}`,
      });
    }

    res.status(200).json({ success: true, data: dentist });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `Cannot update dentist`,
    });
  }
};

//@desc     Delete dentist
//@route    DELETE /api/v1/dentists/:id
//@access   Private
exports.deleteDentist = async (req, res, next) => {
  try {
    const dentist = await Dentist.findById(req.params.id);

    if (!dentist) {
      return res.status(400).json({
        success: false,
        message: `Dentist not found with id of ${req.params.id}`,
      });
    }
    await dentist.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    console.log(err.stack);
    res.status(400).json({ success: false });
  }
};
