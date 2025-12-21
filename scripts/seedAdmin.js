import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const existingAdmin = await User.findOne({ email: "admin@mail.com" });

if (!existingAdmin) {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@mail.com",
    password: hashedPassword,
    role: "admin"
  });

  console.log("Admin user created");
} else {
  console.log("Admin already exists");
}

process.exit();
