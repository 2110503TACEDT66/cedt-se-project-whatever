const Booking = require('../models/Booking');
const Dentist = require('../models/Dentist');

//@desc     Get all bookings
//@route    GET /api/v1/bookings
//@access   Private
exports.getBookings = async (req, res, next) => {
  let query;
  //General users can see only their bookings!
  if (req.user.role === 'user') {
    query = Booking.find({ user: req.user.id })
      .populate({
        path: 'dentist',
        select: 'name experience expertise picture',
      })
      .populate({
        path: 'user',
        select: 'name',
      });
  } else {
    //If you are an admin, you can see all!
    if (req.params.dentistId) {
      console.log(req.params.dentistId);
      query = Booking.find({ dentist: req.params.dentistId })
        .populate({
          path: 'dentist',
          select: 'name experience expertise picture',
        })
        .populate({
          path: 'user',
          select: 'name',
        });
    } else {
      query = Booking.find()
        .populate({
          path: 'dentist',
          select: 'name experience expertise picture',
        })
        .populate({
          path: 'user',
          select: 'name',
        });
    }
  }
  try {
    const bookings = await query;

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: 'Cannot find Booking' });
  }
};

//@desc     Get single booking
//@route    GET /api/v1/bookings/:id
//@access   Public
exports.getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate({
        path: 'dentist',
        select: 'name experience expertise picture',
      })
      .populate({
        path: 'user',
        select: ['name', 'tel', 'email'],
      });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.bookingId}`,
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot find Booking' });
  }
};

//@desc     Add booking
//@route    POST /api/v1/dentists/:dentistId/bookings
//@access   Private
exports.addBooking = async (req, res, next) => {
  try {
    //User creates check up booking
    req.body.dentist = req.params.dentistId;
    if (req.user.role === 'user') {
      const dentist = await Dentist.findById(req.params.dentistId);

      if (!dentist) {
        return res.status(404).json({
          success: false,
          message: `No dentist with the id of ${req.params.dentistId}`,
        });
      }

      req.body.reqType = 'checkup';
      //add user Id to req.body
      req.body.user = req.user.id;

      //Check for existed booking
      const existedBooking = await Booking.find({
        user: req.user.id,
        status: { $ne: 'finish' },
      });

      //The user can only create 1 booking.
      if (existedBooking.length >= 1) {
        return res.status(400).json({
          success: false,
          message: `The user with ID ${req.user.id} has already booked`,
        });
      }
    } else if (req.user.role === 'receptionist') {
      req.body.reqType = 'cure';

      const checkupBooking = await Booking.findById(req.params.bookingId);
      req.body.user = checkupBooking.user;
      req.body.dentist = checkupBooking.dentist;
      req.body.symptom = checkupBooking.symptom;
    }
    const booking = await Booking.create(req.body);

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: 'Cannot book' });
  }
};

//@desc     Update booking session
//@route    PUT /api/v1/bookings/:id
//@access   Private
exports.updateBooking = async (req, res, next) => {
  try {
    let booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.bookingId}`,
      });
    }

    //Make sure user is the booking owner
    if (booking.user.toString() !== req.user.id && req.user.role === 'user') {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this booking session`,
      });
    }

    booking = await Booking.findByIdAndUpdate(req.params.bookingId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: 'Cannot update Booking Session' });
  }
};

//@desc     Delete booking session
//@route    DELETE /api/v1/bookings/:id
//@access   Private
exports.deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: `No booking with the id of ${req.params.bookingId}`,
      });
    }

    //Make sure user is the booking owner
    if (
      booking.user.toString() !== req.user.id &&
      req.user.role !== 'admin' &&
      req.user.role !== 'receptionist'
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this booking`,
      });
    }

    await booking.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot delete Booking' });
  }
};
