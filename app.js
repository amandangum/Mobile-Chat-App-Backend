import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/connectDB.js';
import authRouter from './src/routes/authRoutes.js';

dotenv.config();
const app = express();

connectDB();
app.use(express.json())
app.use("/api/auth", authRouter);

app.get('/', async (req, res) => {
    res.send("Hello World. Welcome to the chat app backend"); //This line of code means we are making a get resquest to the root route
                                          //  and this message will appear when a user accesses the backend through its Port number
});  

export default app;