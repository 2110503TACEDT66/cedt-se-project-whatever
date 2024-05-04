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
/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       required:
 *         - startDate
 *         - endDate
 *         - user
 *         - dentist
 *         - symptom
 *         - status
 *         - reqType
 *         - commentted
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the booking
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         startDate:
 *           type: date
 *           description: Booking's start date
 *         endDate:
 *           type: date
 *           description: Booking's end date
 *         user:
 *           type: string
 *           format: uuid
 *           description: Id of the user that book
 *         dentist:
 *           type: string
 *           format: uuid
 *           description: Id of the booked dentisted
 *         symptom:
 *           type: string
 *           description: Symptom of booking's user
 *         status:
 *           type: string
 *           description: status of the booking
 *         reqType:
 *           type: string
 *           description: type of the booking
 *         commented:
 *           type: boolean
 *           description: state whether the booking is commented
 *         createAt:
 *           type: date
 *           description: Booking's creation date
 *         __v:
 *           type: number
 *           description: version
 *       example:
 *         _id: 662749820815e7ad98e3849f
 *         startDate: 2024-04-24T00:00:00.000Z
 *         endDate: 2024-04-24T01:00:00.000Z
 *         user:
 *            _id: 66251f2f8a1cd8e8bc178d81,
 *            name: bobo
 *         dentist:
 *            _id: 66309913a9c56ca4277c5ce2,
 *            startDate: 2024-04-30T00:00:00.000Z,
 *            endDate: 2024-04-30T01:00:00.000Z,
 *            user: 663098eea9c56ca4277c5ca4,
 *            dentist: 6620b0d4efbbca938f669b71,
 *            symptom: Angry,
 *            status: finish,
 *            reqType: checkup,
 *            createdAt: 2024-04-30T07:09:07.953Z,
 *            __v: 0
 *         symptom: a
 *         status: pending
 *         reqType: checkup
 *         commented: false
 *         createdAt: 2024-04-23T05:39:14.907Z
 *         __v: 0
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: The bookings managing API
 */
/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Returns user's booking or all booking for receptionist
 *     description: User role can only see their booking while receptionist role can see every booking on server.
 *     tags: [Bookings]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     responses:
 *       200:
 *         description: The list of the bookings
 *         content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                bookingExample : {
                  value: {
                     _id: 6630f8714bc0079598e56797,
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                    user: {
                      _id: 66251f2f8a1cd8e8bc178d81,
                      name: bobo
                    },
                    dentist: {
                      _id: 6620b0d4efbbca938f669b71,
                      name: Albert Instin,
                      experience: 10",
                      expertise: Prosthetic Dentistry,
                      picture: https://source.unsplash.com/7bMdiIqz_J4,
                      id: 6620b0d4efbbca938f669b71
                    },
                    symptom: a,
                    status: pending,
                    reqType: checkup,
                    commented: false,
                    createdAt: 2024-04-30T13:56:01.848Z,
                    __v: 0
                  }
                }
              }
 *         }
 *       401:
 *         description: Not authorize to access this route
 *       500:
 *         description: Cannot find Booking.
 */
/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Get the booking by id for receptionist
 *     tags: [Bookings]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     responses:
 *       200:
 *         description: The booking description by id
 *         content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                bookingExample : {
                  value: {
                     _id: 6630f8714bc0079598e56797,
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                    user: {
                      _id: 66251f2f8a1cd8e8bc178d81,
                      name: bobo
                    },
                    dentist: {
                      _id: 6620b0d4efbbca938f669b71,
                      name: Albert Instin,
                      experience: 10",
                      expertise: Prosthetic Dentistry,
                      picture: https://source.unsplash.com/7bMdiIqz_J4,
                      id: 6620b0d4efbbca938f669b71
                    },
                    symptom: a,
                    status: pending,
                    reqType: checkup,
                    commented: false,
                    createdAt: 2024-04-30T13:56:01.848Z,
                    __v: 0
                  }
                }
              }
 *         }
 *       401:
 *         description: Not authorize to access this route
 *       403:
 *         description: The user's role is not authorized to access this route
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Cannot find booking
 */
/**
 * @swagger
 * /dentists/{dentistId}/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     parameters:
 *       - in: path
 *         name: dentistId
 *         schema:
 *           type: string
 *         required: true
 *         description: The dentist id of the booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                createBookingRequestBody : {
                  description : Request body example for createBooking,
                  value: {
                    user: 6618dfc57b33fd268c95c3ac,
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                    symptom: a,
                    status: pending,
                    reqType: checkup
                  }
                }
              }
 *         }
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *         content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                bookingExample : {
                  value: {
                     _id: 6630f8714bc0079598e56797,
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                    user: {
                      _id: 66251f2f8a1cd8e8bc178d81,
                      name: bobo
                    },
                    dentist: {
                      _id: 6620b0d4efbbca938f669b71,
                      name: Albert Instin,
                      experience: 10",
                      expertise: Prosthetic Dentistry,
                      picture: https://source.unsplash.com/7bMdiIqz_J4,
                      id: 6620b0d4efbbca938f669b71
                    },
                    symptom: a,
                    status: pending,
                    reqType: checkup,
                    commented: false,
                    createdAt: 2024-04-30T13:56:01.848Z,
                    __v: 0
                  }
                }
              }
 *         }
 *       400:
 *         description: The user with ID provided has already booked
 *       401:
 *         description: Not authorize to access this route
 *       404:
 *         description: Cannot find dentist of an Id provided.
 *       500:
 *         description: Cannot book.
 */
/**
 * @swagger
 * /bookings/{id}:
 *   post:
 *     summary: Create a new booking for receptionist
 *     tags: [Bookings]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     parameters:
 *       - in: path
 *         name: Id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                createBookingRequestBody : {
                  description : Request body example for createBooking,
                  value: {
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                    status: pending
                  }
                }
              }
 *         }
 *     responses:
 *       201:
 *         description: The booking was successfully created
 *         content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                bookingExample : {
                  value: {
                     _id: 6630f8714bc0079598e56797,
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                    user: {
                      _id: 66251f2f8a1cd8e8bc178d81,
                      name: bobo
                    },
                    dentist: {
                      _id: 6620b0d4efbbca938f669b71,
                      name: Albert Instin,
                      experience: 10",
                      expertise: Prosthetic Dentistry,
                      picture: https://source.unsplash.com/7bMdiIqz_J4,
                      id: 6620b0d4efbbca938f669b71
                    },
                    symptom: a,
                    status: pending,
                    reqType: checkup,
                    commented: false,
                    createdAt: 2024-04-30T13:56:01.848Z,
                    __v: 0
                  }
                }
              }
 *         }
 *       401:
 *         description: Not authorize to access this route
 *       403:
 *         description: The user's role is not authorized to access this route
 *       500:
 *         description: Cannot book.
 */
/**
 * @swagger
 * /bookings/{id}:
 *   put:
 *     summary: Update the booking by the id
 *     tags: [Bookings]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                updateBookingRequestBody : {
                  description : Request body example for updateBooking,
                  value: {
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                  }
                }
              }
 *         }
 *     responses:
 *       200:
 *         description: The booking was updated
 *         content:
*         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Booking'
 *           },
 *           examples: {
                bookingExample : {
                  value: {
                     _id: 6630f8714bc0079598e56797,
                    startDate: 2024-04-24T00:00:00.000Z,
                    endDate: 2024-04-24T01:00:00.000Z,
                    user: {
                      _id: 66251f2f8a1cd8e8bc178d81,
                      name: bobo
                    },
                    dentist: {
                      _id: 6620b0d4efbbca938f669b71,
                      name: Albert Instin,
                      experience: 10",
                      expertise: Prosthetic Dentistry,
                      picture: https://source.unsplash.com/7bMdiIqz_J4,
                      id: 6620b0d4efbbca938f669b71
                    },
                    symptom: a,
                    status: pending,
                    reqType: checkup,
                    commented: false,
                    createdAt: 2024-04-30T13:56:01.848Z,
                    __v: 0
                  }
                }
              }
 *         }
 *       401:
 *         description: Not authorize to access this route
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Some error happened
 */
/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Remove the booking by id
 *     tags: [Bookings]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The booking id
 *
 *     responses:
 *       200:
 *         description: The booking was deleted
 *         content:
 *          application/json:
 *            schema:
 *               type: object
 *       401:
 *         description: Not authorize to access this route
 *       404:
 *         description: The booking was not found
 *       500:
 *         description: Some error occur
 */
module.exports = router;
