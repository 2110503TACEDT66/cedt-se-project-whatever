const express = require('express');

const {
  getFeedbacks,
  getFeedback,
  addFeedback,
  updateFeedback,
  deletefeedback,
} = require('../controllers/feedbacks');

const router = express.Router({ mergeParams: true });
const { protect } = require('../middleware/auth');

router.route('/').get(getFeedbacks).post(protect, addFeedback);
router
  .route('/:feedbackId')
  .get(getFeedback)
  .put(protect, updateFeedback)
  .delete(protect, deletefeedback);
/**
 * @swagger
 * components:
 *   schemas:
 *     Feedback:
 *       type: object
 *       required:
 *         - user
 *         - dentist
 *         - rating
 *         - comment
 *         - booking
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the feedback
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         user:
 *           type: string
 *           format: uuid
 *           description: Id of user that give feedback
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         dentist:
 *           type: string
 *           format: uuid
 *           description: Id of rated dentist
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         rating:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           description: rating of the feedback
 *         comment:
 *           type: string
 *           description: comment of the feedback
 *         booking:
 *           type: string
 *           format: uuid
 *           description: Id of rated booking
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         createAt:
 *           type: date
 *           description: Feedback's creation date
 *         __v:
 *           type: number
 *           description: version
 *       example:
 *         _id: 662749820815e7ad98e3849f
 *         user: 6618dfc57b33fd268c95c3ac
 *         dentist: 6620b1a0efbbca938f669b76
 *         booking: 662749820815e7ad98e3849f
 *         rating: 4
 *         comment: nono
 *         createdAt: 2024-04-23T05:39:14.907Z
 *         __v: 0
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: Feedbacks
 *   description: The feedbacks managing API
 */
/**
 * @swagger
 * /feedbacks:
 *   get:
 *     summary: Returns all feedback
 *     tags: [Feedbacks]
 *     responses:
 *       200:
 *         description: The list of the feedbacks
 *         content:
 *          application/json: {
 *            schema: {
 *               $ref: '#/components/schemas/Feedback'
 *            },
 *            examples: {
                 feedbackExample : {
                   value: {
                     _id: 6630998da9c56ca4277c5d41,
                     dentist: 6620b0d4efbbca938f669b71,
                     user: {
                         _id: 663098eea9c56ca4277c5ca4,
                         name: AngryUser
                     },
                     booking: 66309913a9c56ca4277c5ce2,
                     comment: PLEAASEEEEE don't make me more angry!!!!!,
                     rating: 1,
                     createdAt: 2024-04-30T07:11:09.626Z,
                     __v: 0
                   }
                 }
               }
 *          }
 *       500:
 *         description: Cannot find Feedback.
 */
/**
 * @swagger
 * /feedbacks/{id}:
 *   get:
 *     summary: Get the feedback by id
 *     tags: [Feedbacks]
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
 *         description: The feedback id
 *     responses:
 *       200:
 *         description: The feedback description by id
 *         content:
 *          application/json: {
 *            schema: {
 *               $ref: '#/components/schemas/Feedback'
 *            },
 *            examples: {
                 feedbackExample : {
                   value: {
                     _id: 6630998da9c56ca4277c5d41,
                     dentist: 6620b0d4efbbca938f669b71,
                     user: {
                         _id: 663098eea9c56ca4277c5ca4,
                         name: AngryUser
                     },
                     booking: 66309913a9c56ca4277c5ce2,
                     comment: PLEAASEEEEE don't make me more angry!!!!!,
                     rating: 1,
                     createdAt: 2024-04-30T07:11:09.626Z,
                     __v: 0
                   }
                 }
               }
 *          }
 *       404:
 *         description: The feedback was not found
 *       500:
 *         description: Cannot find feedback
 */
/**
 * @swagger
 * /dentists/{dentistId}/feedbacks:
 *   post:
 *     summary: Create a new feedback
 *     tags: [Feedbacks]
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
 *         description: The dentist id of the feedback
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Feedback'
 *           },
 *           examples: {
                createFeedbackRequestBody : {
                  description : Request body example for createFeedback,
                  value: {
                    booking: 6618dfc57b33fd268c95c3ac,
                    rating: 4,
                    comment: nono,
                  }
                }
              }
 *         }
 *     responses:
 *       201:
 *         description: The feedback was successfully created
 *         content:
 *          application/json: {
 *            schema: {
 *               $ref: '#/components/schemas/Feedback'
 *            },
 *            examples: {
                 feedbackExample : {
                   value: {
                     _id: 6630998da9c56ca4277c5d41,
                     dentist: 6620b0d4efbbca938f669b71,
                     user: {
                         _id: 663098eea9c56ca4277c5ca4,
                         name: AngryUser
                     },
                     booking: 66309913a9c56ca4277c5ce2,
                     comment: PLEAASEEEEE don't make me more angry!!!!!,
                     rating: 1,
                     createdAt: 2024-04-30T07:11:09.626Z,
                     __v: 0
                   }
                 }
               }
 *          }
 *       401:
 *         description: Not authorize to access this route
 *       404:
 *         description: Cannot find dentist of an Id provided.
 *       500:
 *         description: Cannot add feedback.
 */
/**
 * @swagger
 * /feedbacks/{id}:
 *   put:
 *     summary: Update the feedback by the id
 *     tags: [Feedbacks]
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
 *         description: The feedback id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/Feedback'
 *           },
 *           examples: {
                updateFeedbackRequestBody : {
                  description : Request body example for updateFeedback,
                  value: {
                    rating: 4,
                    comment: nono
                  }
                }
              }
 *         }
 *     responses:
 *       200:
 *         description: The feedback was updated
 *         content:
 *          application/json: {
 *            schema: {
 *               $ref: '#/components/schemasFeedback'
 *            },
 *            examples: {
                 feedbackExample : {
                   value: {
                     _id: 6630998da9c56ca4277c5d41,
                     dentist: 6620b0d4efbbca938f669b71,
                     user: {
                         _id: 663098eea9c56ca4277c5ca4,
                         name: AngryUser
                     },
                     booking: 66309913a9c56ca4277c5ce2,
                     comment: PLEAASEEEEE don't make me more angry!!!!!,
                     rating: 1,
                     createdAt: 2024-04-30T07:11:09.626Z,
                     __v: 0
                   }
                 }
               }
 *          }
 *       404:
 *         description: The feedback was not found
 *       500:
 *         description: Some error happened
 */
/**
 * @swagger
 * /feedbacks/{id}:
 *   delete:
 *     summary: Remove the feedback by id
 *     tags: [Feedbacks]
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
 *         description: The feedback id
 *
 *     responses:
 *       200:
 *         description: The feedback was deleted
 *         content:
 *          application/json:
 *            schema:
 *               type: object
 *
 *       404:
 *         description: The feedback was not found
 *       500:
 *         description: Some error occur
 */
module.exports = router;
