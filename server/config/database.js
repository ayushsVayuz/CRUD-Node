import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


/**
 * @param {void} - No parameters required.
 * @return {Promise<void>} - Connects to MongoDB or exits the process if connection fails.
 */
const connectDB = async () => {
      
  try {
    const connection  = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(" MongoDB error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
