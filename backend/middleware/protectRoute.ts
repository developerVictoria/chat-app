import jwt from "jsonwebtoken";
import { Request, Response, NextFunction }  from 'express';

export const protectRoute = (req:Request, res:Response, next:NextFunction) =>{
    try{
        
    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
}