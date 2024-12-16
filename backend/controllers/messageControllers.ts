import { Request, Response, Router }  from 'express';
import Conversation from '../models/conversationModel';
import Message from '../models/messageModel';
import mongoose, {ObjectId} from 'mongoose';
interface MyUserRequest extends Request {
    user?: any;
}

export const getMessages = async (req:MyUserRequest, res:Response)=>{
    try{
        const {id:reciverId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            partisipants:  {$in: [senderId, new mongoose.Types.ObjectId(reciverId)] },
        }).populate("messages");
        if(!conversation){
            res.status(200).json([]);
        }else{
            const messages = conversation.messages;
            res.status(200).json(messages);   
        }
        
    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
}

export const sendMessage = async (req:MyUserRequest, res:Response)=>{
    try{
        const {message} = req.body;
        const {id:reciverId} = req.params;
        const senderId = req.user._id;
        
        let conversation = await Conversation.findOne({
            partisipants:  {$in: [senderId, new mongoose.Types.ObjectId(reciverId)] },
        });
        
        
        if(!conversation){
            conversation = await Conversation.create({
                partisipants:[senderId , reciverId]
            });
        } 
        const newMessage = new Message({
            senderId:senderId,
            resiverId: new mongoose.Types.ObjectId(reciverId),
            message:message,

        });
        await newMessage.save();
        if(newMessage){
            conversation.messages.push(newMessage._id);
            await conversation.save();
        };
        //console.log(conversation);
        res.status(200).json(newMessage)

    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
}