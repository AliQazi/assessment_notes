import express from "express";
import dotenv from 'dotenv';
import dbConnection from "./config/db.js"
import cors from 'cors'
import authRoute from "./routes/authRoute.js"

const app = express();
dotenv.config();
dbConnection();

app.use(cors());

app.use(express.json());
app.use('/api/v1/auth', authRoute)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})