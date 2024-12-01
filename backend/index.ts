'use strict';
import express, { Request, Response }  from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';


import userRoutes from "./routes/userRoutes";
import connectToMongoDB from './db/connectMongoDB';


const PORT: number|string = process.env.PORT || 5000 ;
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes);

app.use(express.json());

app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server Running on the port ${PORT}`);
})