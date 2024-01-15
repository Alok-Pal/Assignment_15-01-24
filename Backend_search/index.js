import express from 'express'
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from 'cors';
import { userRouter } from './app/routes/userRoutes.js';

dotenv.config()

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())
app.use('/user', userRouter);


app.listen(port, () => {
    console.log(`app is running on Port ${port}`);
})