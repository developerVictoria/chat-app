import { Request, Response }  from 'express';
import bcrypt from "bcryptjs";
import {generatePasswordHash, generateTokenAndSetCookies} from '../utils/userSingUpUtils';
import User from "../models/userModel";
interface MyUserRequest extends Request {
    user?: any;
}

export const loginUser = async (req :Request, res: Response) =>{
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        console.log(user);
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        console.log(isPasswordCorrect)
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

    }catch(error:any){
        console.log(error);
        res.status(500).json({error: `userControls: loginUser: Internal server error ${error.message}`});
    }
  
};

export const logOutUser = (req :Request, res: Response)=>{
    try{
        res.cookie("jwt","", {maxAge:0});
        res.status(200).json({message:"Logout was successfull!"});
    }catch(error){
        console.log(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
};

export const singupUser = async (req :Request, res: Response)=>{
    try{
        const {firstName, lastName, username, password} = req.body;
        let profilePic = "";
        if(!password || password.length<=8){ res.status(400).json({error: "Password must be provided and be more then 8 symbols!"}); return } 
        if(!firstName || !lastName){ res.status(400).json({error: "First and last name must be provided!"}); return  }
        if(!username){res.status(400).json({error: "Username must be provided!"}); return  }
        const user = await User.findOne({username});
        if(user){ res.status(400).json({error: "Username already taken!"}); return }
                
        profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;
        let hashedPassword = await generatePasswordHash(password);

        const newUser = new User({
            fullName:`${firstName} ${lastName}`,
            username: username,
            password: hashedPassword,
            profilePic: profilePic,
        })

        if(!newUser){
            res.status(400).json({error: "Invalid user data!"});
            return;
        } 

        generateTokenAndSetCookies(newUser._id, res);
        await newUser.save();
        

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
            
    }catch(error:any){
        console.log(error);
        res.status(500).json({error: `userControls: singupUser: Internal server error ${error.message}`});
    }
   
};

export const getUserForSidebar = async (req :MyUserRequest, res: Response)=>{
try{
        const loggedUser = req.user._id;
        const fillteredUsers = await User.find({_id: {$ne: loggedUser}}).select("-password");

        res.status(200).json(fillteredUsers);

    }catch(error){
        console.log(error);
        res.status(500).json({error: `userControls: getUserForSidebar: Internal server error ${error}`});
}
}