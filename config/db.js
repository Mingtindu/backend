import mongoose from "mongoose";

const connectDB = async()=>{
  try {
    await mongoose.connect("mongodb://localhost:27017");
    console.log("MONGODB CONNECTED")
  } catch (error) {
    console.log("Error occured while connecting to db ",error)
    
  }
}

export {connectDB}