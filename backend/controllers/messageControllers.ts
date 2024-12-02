import { Request, Response, Router }  from 'express';

export const sendMessage = (req:Request, res:Response)=>{
    console.log("send msg", req.params.id);
    try{
        const {message} = req.body;
        const {id} = req.params;
        const senderId = ''
    }catch(error){
        console.error(error);
        res.status(500).json({error: `Internal server error ${error}`});
    }
}