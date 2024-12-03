import jwt from "jsonwebtoken";
import { Request, Response, NextFunction }  from 'express';
import User from "../models/userModel";

interface MyUserRequest extends Request {
    user?: any;
  }


export const protectRoute = async (req:MyUserRequest, res:Response, next:NextFunction) =>{
    try{
        const token = req.cookies.jwt;
        if(!token) res.status(401).json({error: `Not authorized for the operation ! No token provided`});
        let userId: jwt.JwtPayload | undefined = undefined;
        if(process.env.JWT_SECRET)  userId = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload 
        if(!userId) res.status(401).json({error: `Not authorized for the operation ! Invalid token`});
            
        const user = await User.findById(userId).select("-password");
        if(!user) res.status(404).json({error: `Not user found!`});

        req.user = user;
        next();
         
    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
}