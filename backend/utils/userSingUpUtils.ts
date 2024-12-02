import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Response }  from 'express';
import Schema from 'mongoose';

export const generatePasswordHash = async (password:string):Promise<string>=>{
    let result = "";
    const salt = await bcrypt.genSalt(16);
    result = await bcrypt.hash(password, salt);
    return result;
}

export const generateTokenAndSetCookies = (userId:Schema.Types.ObjectId, res:Response)=>{
    if(process.env.JWT_SECRET){
        const token = jwt.sign({userId}, process.env.JWT_SECRET, {
            expiresIn: '15d'
        });
        res.cookie("jwt", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:"strict",
            secure: process.env.NODE_ENV !== "development"
        });

    }else{
        res.status(500).json({error: `Internal server error : jwt secret not set`});
    }

}

