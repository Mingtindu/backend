import mongoose from "mongoose";
import { DB_URL } from "./env.js";

const connectDB = async()=>{
  try {
    await mongoose.connect(DB_URL);
    console.log("MONGODB CONNECTED")
  } catch (error) {
    console.log("Error occured while connecting to db ",error)
    
  }
}

export {connectDB}