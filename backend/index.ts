'use strict';


import express, { Request, Response }  from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
dotenv.config();


const PORT: number|string = process.env.PORT || 5000 ;

const app = express();
app.use(bodyParser.json());

app.get("/", (req :Request, res: Response)=>{
    //root route
});

app.post("/user/singup", (req :Request, res: Response)=>{
    //singup route to authenticate
});

app.get("/user/", (req :Request, res: Response)=>{
    //user route to get users
});


app.post("/user/login", (req :Request, res: Response)=>{
    //login route
});

app.get("/user/logout", (req :Request, res: Response)=>{
    //logout route with redirect to login page
});

app.listen(5000,()=>{
    console.log(`Server Running on the port ${PORT}`);
})