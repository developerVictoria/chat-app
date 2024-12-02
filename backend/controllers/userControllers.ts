import { Request, Response }  from 'express';
import User from "../models/userModel";

export const loginUser = (req :Request, res: Response) =>{
    //login route
  
};
export const logOutUser = (req :Request, res: Response)=>{
    //logout route with redirect to login page
   
};
export const singupUser = async (req :Request, res: Response)=>{
    try{
        const {firstName, lastName, username, password, confirmPassword} = req.body;
        let profilePic = "";
        if(password !== confirmPassword) res.status(400).json({error: "Password doesn't match entered confirm password!"});
        if(!firstName && !lastName) res.status(400).json({error: "First and last name must be provided!"});
        if(!username)  res.status(400).json({error: "Username must be provided!"});

        const user = await User.findOne({username});
        if(user) res.status(400).json({error: "Username already taken!"});
                
        profilePic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

        const newUser = new User({
            fullName:`${firstName} ${lastName}`,
            username: username,
            password: password,
            profilePic: profilePic,
        })

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })
    }catch(error){
        console.error(error);
    }
   
};
