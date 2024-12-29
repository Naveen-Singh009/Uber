import express from 'express'

import {registerUser, loginUser, getUserProfile, logoutUser} from '../controllers/user.controller.js'
import { authUser } from '../middlewares/auth.middleware.js'

import {body} from 'express-validator'

const router = express.Router()


router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:2}).withMessage('firstname must be atleast 2 character long'),
    body('password').isLength({min: 6}).withMessage('password must be atleast 6 char long')
], registerUser);


router.post('/login', [
    body('email').isEmail().withMessage("invalid email"),
    body('password').isLength({min: 6}).withMessage('password must be atleast 6 char long')
], loginUser);


router.get('/profile',authUser, getUserProfile)
router.get('/logout', authUser, logoutUser )


export  default router;