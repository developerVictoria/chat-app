import mongoose, { Schema } from 'mongoose';


const conversationSchema = new mongoose.Schema({
    partisipants:[
        {
            type: Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:Schema.Types.ObjectId,
            ref:"Message",
            default: []
        }
    ],
})

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;