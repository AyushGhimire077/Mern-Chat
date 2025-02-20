import mongoose from "mongoose";
import 'dotenv/config'

 const connectDB = async () => {
    try {
       const connect = await mongoose.connect(process.env.MONGO_URL);
        if (connect) {
            console.log("Database connected");
        } else {
            console.log("Database not connected"); 
        }
    } catch (error) {
        console.log(error);
    }
};

export default connectDB 