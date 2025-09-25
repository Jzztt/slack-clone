import mogoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async (mongoURI) => {
  try {
    const conn = await mogoose.connect(ENV.MONGO_URI);

    console.log("MongoDB connected successfully:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
