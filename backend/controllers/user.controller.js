import { userModel , hashPassword } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";

const registerUser = async ( req, res , next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;
    // documentation
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
        firstname:  fullname.firstname, 
        lastname : fullname.lastname,
        email,
        password : hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user});
}  

const loginUser = async (req, res, next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 
    
    const {email, password} = req.body;

    const user  = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({message: 'Invalid email or password'});
    }
    console.log(password);
    
    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({message: 'Invalid email or password'});
    }

    const token = user.generateAuthToken();
    res.cookie('token', token)
    res.status(200).json({token, user})

}

const getUserProfile = async(req, res, next)=>{
    
    res.status(200).json(req.user);
}

export {
    registerUser,
    loginUser,
    getUserProfile
};
