import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String, 
            required: true,
            minlength : [2, 'first name must be atleast 2 characters']
        },
        lastname: {
            type: String,
            minlength : [2, 'last name must be atleast 2 characters']
        }
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'email must be atleast 5 characters']
    },
    password: {
        type: String, 
        required: true,
        select: false,
    }, 
    socketId: {
        type: String,
    }
})


userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET_KEY);
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

userSchema.methods.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

export const userModel = mongoose.model('user', userSchema);





