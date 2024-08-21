import mongoose from "mongoose";

export const connectDB = async (mongo_url: string) => {
    const conn = await mongoose.connect(mongo_url);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};


