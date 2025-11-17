// all notes are handwritten

// Connecting to MongoDB using Mongoose
import mongoose from "mongoose";

// Load environment variables
import dotenv from "dotenv";


dotenv.config();

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("MONGO_URI not set in .env");
    await mongoose.connect(uri, {
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
