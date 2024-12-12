import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectToDb from './db/db.js';
import userRouter from './routes/user.routes.js';

connectToDb();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=>{
    res.send("hello world")
})

app.use('/users', userRouter)


export default app;