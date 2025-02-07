import express from "express";
import { body } from "express-validator";
import { registerCaptain } from "../controllers/captain.controller.js";
const router = express.Router();

router.post('/register', [
    body('email').isEmail().withMessage('Invalid email'),
    body('fullname.firstname').isLength({min:3 }).withMessage('firstname must be atleast 2 character long'),
    body('password').isLength({min: 6}).withMessage('password must be atleast 6 char long'),
    body('vehicle.color').isLength({min:3}).withMessage('color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('plate must be atleast 3 characters long'),
    body('vehicle.capacity').isLength({min:1}).withMessage('capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car', 'motorcycle', 'auto']).withMessage('vehicleType must be car, motorcycle or auto'),
 ],  registerCaptain);



export default router;