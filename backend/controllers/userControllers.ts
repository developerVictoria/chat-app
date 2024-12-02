import { Request, Response }  from 'express';
import {generatePasswordHash} from '../helpers/userHelpers';
import User from "../models/userModel";

export const loginUser = (req :Request, res: Response) =>{
    //login route
  
};
export const logOutUser = (req :Request, res: Response)=>{
    //logout route with redirect to login page
   
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
