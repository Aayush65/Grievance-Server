import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import { loginUsersController, registerUsersController } from './controllers/AuthControllers';


config();
const app = express();
app.use(express.json());
app.use(cors());

app.post('/register', registerUsersController);
app.post('/login', loginUsersController);

// app.use(middle)

mongoose.connect(process.env.MONGO_URL!).then(() => {
    console.log(`Connected to MongoDB and Listening on Port ${process.env.PORT}`);
    app.listen(process.env.PORT);
}).catch((err) => {
    console.log("Can't connect to the MongoDB");
    console.log(err);
})