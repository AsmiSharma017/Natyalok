
// // config/db.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const uri =
//       process.env.NODE_ENV === "test"
//         ? process.env.MONGO_URI_TEST
//         : process.env.MONGO_URI;

//     if (!uri) throw new Error("Mongo URI not set");
//     await mongoose.connect(uri, {});
//     console.log("MongoDB connected");
//   } catch (err) {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   }
// };

// export default connectDB;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    let uri = process.env.MONGO_URI;
    
    if (process.env.NODE_ENV === 'test') {
      uri = process.env.MONGO_URI_TEST || process.env.MONGO_URI;
    }
    
    if (!uri) throw new Error('MONGO_URI not set in .env');
    
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
