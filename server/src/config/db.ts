import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if(process.env.MONGO_URI){
            const conn = await mongoose.connect(process.env.MONGO_URI)
            console.log(`MongoDB connected`);
        }
        else{
            throw new Error('MONGO URI is not defined')
        }
    } catch (error : unknown) {
        if (error instanceof Error) {
            console.log(`Error: ${error.message}`);
        } else {
            console.log('An unknown error occurred');
        }
        process.exit(1);
    }
}

export default connectDB;