import mongoose from 'mongoose';

const connectToMongoDB = async ()=>{
    try{
        if(process.env.MONGO_DB_URL){
            await mongoose.connect(process.env.MONGO_DB_URL);
            console.log(`Connected to MongoDB`);
        }else{
            throw new Error(`MongoDB URL isn't defined: ${process.env.MONGO_DB_URL}`)
        }
    
    }catch(error){
        console.error(error)
    }
}


export default connectToMongoDB;