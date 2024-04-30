const express = require("express");
const { register, login, getMe, logout } = require("../controllers/auth");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.get("/logout", protect, logout);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - tel
 *         - email
 *         - role
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated id of the dentist
 *           example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *         name:
 *           type: string
 *           description: User's name
 *         tel:
 *           type: string
 *           description: User's telephone number
 *         email:
 *           type: string
 *           description: User's email
 *         role:
 *           type: string
 *           description: User's role
 *         password:
 *           type: string
 *           description: User's password
 *         resetPasswordToken:
 *           type: string
 *           description: User's resetPasswordToken
 *         resetPasswordExpire:
 *           type: date
 *           description: User's resetPasswordExpire date
 *         createAt:
 *           type: date
 *           description: User's creation date
 *         __v:
 *           type: number
 *           description: version
 *       example:
 *         _id: 66251f2f8a1cd8e8bc178d81
 *         name: bobo
 *         tel: 5896357896
 *         email: Bobata@gmail.com
 *         role: user
 *         password: 4Ft78gss
 *         createAt: 2024-04-21T14:14:07.965Z
 *         __v: 0
 *   securitySchemes: {
 *     bearerToken: {
 *       type: apiKey,
 *       in: header,
 *       name: Authorization,
 *       description: Authorization for accesing endpoints
 *     }
 *   }
 *
 *
 */
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current Logged in user
 *     tags: [Users]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     responses:
 *       200:
 *         description: Your user info
 *         content:
 *           application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorize to access this route
 */
/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Log user out / clear cookie
 *     tags: [Users]
 *     security: [
 *         {
 *             bearerToken: []
 *         }
 *     ]
 *     responses:
 *       200:
 *         description: Logout and clear cookies successfully
 *         content:
 *           application/json: {
 *              schema: {
 *                  $ref: '#/components/schemas/User'
 *              },
 *               examples: {
                    Logout : {
                      description : logout,
                      value: {
                        
                      }
                    }
                  }
 *             }
 *       401:
 *         description: Not authorize to access this route
 */
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/User'
 *           },
 *           examples: {
                registerRequestBody : {
                  description : Request body example for register,
                  value: {
                    name: bobo,
                    tel: 5896357896,
                    email: Bobata@gmail.com,
                    role: user,
                    password: 4Ft78gss
                  }
                }
              }
 *         }
 *     responses:
 *       201:
 *         description: A user account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Cannot register
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login and acquire user token.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json: {
 *           schema: {
 *              $ref: '#/components/schemas/User'
 *           },
 *           examples: {
                loginRequestBody : {
                  description : Request body example for login,
                  value: {
                    email: Bobata@gmail.com,
                    password: 4Ft78gss
                  }
                }
              }
 *         }
 *     responses:
 *       201:
 *         description: A user account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Cannot convert email or password to string
 *       401:
 *         description: Invalid credentials
 *       
 */
module.exports = router;
