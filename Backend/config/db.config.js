import  mongoose from 'mongoose'

const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL,{});
        console.log('mongoDb connected');
    } catch (error) {
        console.log("error connecting to mongoDB",error);
        process.exit(1);
    }
};

export {connectDB}