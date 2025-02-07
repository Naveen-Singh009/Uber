import { userModel , hashPassword } from "../models/user.model.js";
import { createUser } from "../services/user.service.js";
import { validationResult } from "express-validator";
import BlacklistToken  from "../models/blacklistToken.model.js";

const registerUser = async ( req, res , next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password} = req.body;
    const isUserAlreadyExist = await userModel.findOne({email});

    if(isUserAlreadyExist){
        return res.status(400).json({message: 'User already exist'});
    }
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

const logoutUser = async (req, res, next)=>{
    try {
        const token = req.cookie?.token || req.headers.authorization?.split(' ')[1];
        // const token = req.cookie?.token || (req.headers.authorization && req.headers.authorization.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
        if (!token) {
            return res.status(400).json({ error: "Token is required for logout" });
        }
        res.clearCookie('token');
        await BlacklistToken.create({token})
        res. status(200).json({message : 'Logged out'});
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ error: error.message });
    }
}

export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};
