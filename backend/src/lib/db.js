import mongoose from 'mongoose'; //connect to mongodb and interact with it

export const connectDB = async () => {
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("MongoDB connection error:", error);
    }
};