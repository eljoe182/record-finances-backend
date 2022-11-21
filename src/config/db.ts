import mongoose from "mongoose";
import { variables } from './variables';

async function connectDB() {
  try {
    mongoose.connect(variables.DB).then(() => {
      console.log("MongoDB Connected...");
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
