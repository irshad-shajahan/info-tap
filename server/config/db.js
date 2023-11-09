import mongoose from 'mongoose'
import colors from 'colors'

export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{dbName:'info-tap'})
        console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
    }catch(error){
        console.log(`Mongodb server Issue ${error}`.bgRed.white);
    }
}

