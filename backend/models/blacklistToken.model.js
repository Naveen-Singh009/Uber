import mongoose from "mongoose";


const blacklistTokenScnema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, `Path token is required`],
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400,
    }
});

export const BlacklistToken  = mongoose.model('BlacklistToken', blacklistTokenScnema);


