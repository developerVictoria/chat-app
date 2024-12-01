'use strict';


import express, { Request, Response }  from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import userRoutes from "./routes/userRoutes"
dotenv.config();
const PORT: number|string = process.env.PORT || 5000 ;
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userRoutes);


app.get('/', (req :Request, res: Response) =>{
    console.log(req);
    res.status(234).send('Bacic chat app');
    return;
});



app.listen(PORT,()=>{
    console.log(`Server Running on the port ${PORT}`);
})