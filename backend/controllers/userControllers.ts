import { Request, Response }  from 'express';
import bcrypt from "bcryptjs";
import {generatePasswordHash, generateTokenAndSetCookies} from '../utils/userSingUpUtils';
import User from "../models/userModel";

export const loginUser = async (req :Request, res: Response) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!isPasswordCorrect) res.status(400).json({error: "Invalid username or password !"});
        if(!user){
            res.status(400).json({error: "Invalid username or password !"});
        }else{
            generateTokenAndSetCookies(user._id, res);
            res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                profilePic: user.profilePic,
            });
        }

    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
  
};


export const logOutUser = (req :Request, res: Response)=>{
    try{
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message:"Logout was successfull!"});
    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
};

export const singupUser = async (req :Request, res: Response)=>{
    try{
        const {firstName, lastName, username, password} = req.body;
        let profilePic = "";
        if(!password || password.length<=8) res.status(400).json({error: "Password must be provided and be more then 8 symbols!"});
        if(!firstName || !lastName)res.status(400).json({error: "First and last name must be provided!"});
        if(!username)  res.status(400).json({error: "Username must be provided!"});
        const user = await User.findOne({username});
        if(user) res.status(400).json({error: "Username already taken!"});
                
        profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
        let hashedPassword = await generatePasswordHash(password);

        const newUser = new User({
            fullName:`${firstName} ${lastName}`,
            username: username,
            password: hashedPassword,
            profilePic: profilePic,
        })

        if(!newUser) res.status(400).json({error: "Invalid user data!"});

        generateTokenAndSetCookies(newUser._id, res);
        await newUser.save();
        

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
            
    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
   
};
