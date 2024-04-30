const express = require("express");
const {
  getDentists,
  getDentist,
  addDentist,
  updateDentist,
  deleteDentist,
} = require("../controllers/dentists");
const bookingRouter = require("./bookings");
const feedbackRouter = require("./feedbacks");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

//Re-route into other resource routers
router.use("/:dentistId/bookings/", bookingRouter);
router.use("/:dentistId/feedbacks", feedbackRouter);

router
  .route("/")
  .get(getDentists)
  .post(protect, authorize("admin"), addDentist);
router
  .route("/:id")
  .get(getDentist)
  .put(protect, authorize("admin"), updateDentist)
  .delete(protect, authorize("admin"), deleteDentist);

/**
 * @swagger
 * components:
 *   schemas:
 *     Dentist:
 *       type: object
 *       required:
 *         - name
 *         - experience
 *         - expertise
 *         - picture
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the dentist
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name:
 *           type: string
 *           description: Dentist's name
 *         experience:
 *           type: number
 *           description: Dentist's year of experience
 *         expertise:
 *           type: string
 *           description: Dentist's area of expertise
 *         picture:
 *           type: string
 *           description: Dentist's picture as a link address
 *         __v:
 *           type: number
 *           description: version
 *       example:
 *         _id: 609bda561452242d88d36e37
 *         name: Happy Dentist
 *         experience: 10
 *         expertise: Orthodontics
 *         picture: https://source.unsplash.com/akPctn2G0jM
 *         bookings: []
 *         __v: 0
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
 *         content:
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
 *     summary: Create a new dentist for receptionist
 *     tags: [Dentists]
 *     security: [
 *         {
 *             bearerToken: []
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
 *         content:
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
 *     summary: Update the dentist by the id for receptionist
 *     tags: [Dentists]
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
 *     summary: Remove the dentist by id for receptionist
 *     tags: [Dentists]
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
 *       500:
 *         description: Some error occur
 */

module.exports = router;
