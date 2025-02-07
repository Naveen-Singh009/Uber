import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength:[3,'firstname must be atleast 3 characters']
        },
        lastname:{
            type:String,
            minlength:[3,'lastname must be atleast 3 characters']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, 'is invalid']
    },
    password:{
        type: String,
        required: true,
        select: false,
        minlength:[6,'password must be atleast 6 characters']
    },
    socketId: {
        type: String
    },
    status:{
        type:String,
        enum:['active', 'inactive'],
        default: 'inactive',
    },
    vehicle: {
        color: {
            type: String,
            required: true,
            minlength:[3,'color must be atleast 3 characters']
        },
        plate: {
             type: String,
             required: true,
             minlength:[3,'plate must be atleast 3 characters long'],
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            enum: ['car', 'motorcycle', 'auto'],
            required: true
        }
    },
    location: {
        lat: {
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})
captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET_KEY, {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

export const hashPassword = async (password) => {
    if (!password) throw new Error('Password is required.');
    return await bcrypt.hash(password, 10);
};

export const captainModel = mongoose.model('captain', captainSchema);
