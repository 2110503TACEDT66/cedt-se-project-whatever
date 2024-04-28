const express = require("express");

const {
  getBookings,
  addBooking,
  getBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookings");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router.route("/").get(protect, getBookings).post(protect, addBooking);
router
  .route("/:bookingId")
  .get(protect, authorize("admin", "receptionist"), getBooking)
  .post(protect, authorize("admin", "receptionist"), addBooking)
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
 *           description: The auto-generated id of the dentist
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
 *           description: Id of user that book
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         dentist:
 *           type: string
 *           format: uuid
 *           description: Id of booked dentisted
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
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
 *         __v:
 *           type: number
 *           description: version
 *       example:
 *         _id: 609bda561452242d88d36e37
 *         name: Happy Dentist
 *         experience: 10
 *         expertise: Orthodontics
 *         picture: https://source.unsplash.com/akPctn2G0jM
 *         __v: 0
 *         bookings: [{_id: 662749820815e7ad98e3849f,
                  startDate: 2024-04-24T00:00:00.000Z,
                  endDate: 2024-04-24T01:00:00.000Z,
                  user: 6618dfc57b33fd268c95c3ac,
                  dentist: 6620b1a0efbbca938f669b76,
                  symptom: a,
                  status: pending,
                  reqType: checkup,
                  createdAt: 2024-04-23T05:39:14.907Z,
                  __v: 0}]
 *
 */
/**
 * @swagger
 * tags:
 *   name: Dentists
 *   description: The dentists managing API
 */
/**
 * @swagger
 * /dentists:
 *   get:
 *     summary: Returns the list of all the dentists
 *     tags: [Dentists]
 *     responses:
 *       200:
 *         description: The list of the dentists
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Dentist'
 *       400:
 *         description: Some errors occur.
 */
/**
 * @swagger
 * /dentists/{id}:
 *   get:
 *     summary: Get the dentist by id
 *     tags: [Dentists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dentist id
 *     responses:
 *       200:
 *         description: The dentist description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dentist'
 *       404:
 *         description: The dentist was not found
 */
/**
 * @swagger
 * /dentists:
 *   post:
 *     summary: Create a new dentist
 *     tags: [Dentists]
 *     security: [
 *         {
 *             bearerAuth: []
 *         }
 *     ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Dentist'
 *           },
 *           examples: {
                createDentistRequestBody : {
                  description : Request body example for createDentist,
                  value: {
                    name: Paul Samon,
                    experience: 6,
                    expertise: Dental occultion,
                    picture: https://source.unsplash.com/akPctn2G0jM
                  }
                }
              }
 *         }
 *     responses:
 *       201:
 *         description: The dentist was successfully created
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dentist'
 *       400:
 *         description: Cannot add dentist
 *       401:
 *         description: Not authorize to access this route
 *       403:
 *         description: The user's role is not authorized to access this route
 */
/**
 * @swagger
 * /dentists/{id}:
 *   put:
 *     summary: Update the dentist by the id
 *     tags: [Dentists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dentist id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Dentist'
 *           },
 *           examples: {
                updateDentistRequestBody : {
                  description : Request body example for updateDentist,
                  value: {
                    name: Paul Samond,
                    experience: 16,
                  }
                }
              }
 *         }
 *     responses:
 *       200:
 *         description: The dentist was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Dentist'
 *       401:
 *         description: Not authorize to access this route
 *       403:
 *         description: The user's role is not authorized to access this route
 *       404:
 *         description: The dentist was not found
 *       500:
 *         description: Some error happened
 */
/**
 * @swagger
 * /dentists/{id}:
 *   delete:
 *     summary: Remove the dentist by id
 *     tags: [Dentists]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The dentist id
 *
 *     responses:
 *       200:
 *         description: The dentist was deleted
 *       401:
 *         description: Not authorize to access this route
 *       403:
 *         description: The user's role is not authorized to access this route
 *       404:
 *         description: The dentist was not found
 */
module.exports = router;
