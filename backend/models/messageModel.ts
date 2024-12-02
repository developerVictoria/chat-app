import mongoose, { Schema } from 'mongoose';


const messageSchema = new mongoose.Schema({
    senderId:{
        type:Schema.Types.ObjectId, 
        ref: "User",
        required: true,
    }, 
    resiverId:{
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message:{
        type:String,
        required:true,
    },

})

const Message = mongoose.model("Message", messageSchema);

export default Message;