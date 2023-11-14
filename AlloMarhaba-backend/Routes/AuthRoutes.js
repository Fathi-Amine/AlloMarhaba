const express = require('express')
const router = express.Router()
const {login, register, dashboard, logout,forgotPassword,resetPassword} = require('../Controllers/AuthController')
const authMiddleware = require('../Middlewares/authMiddleware')
const sendEmail = require('../Controllers/Email')

router.get('/dashboard', authMiddleware, dashboard)
router.delete('/logout',authMiddleware, logout )
//
router.post('/register',register)
// /**
//  * @swagger
//  * /login:
//  *   post:
//  *     summary: Login with user credentials
//  *     description: Authenticate and log in a user with their credentials.
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *               password:
//  *                 type: string
//  responses:
//  '200':
//  description: User login successful
//  content:
//  application/json:
//  schema:
//  $ref: '#/components/schemas/User'
//  '401':
//  description: Unauthorized - Invalid credentials
//  '500':
//  description: Internal server error
//  */
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.post('/resetPassword', resetPassword)


module.exports = router
