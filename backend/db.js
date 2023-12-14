
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();


const db = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db ? console.log("Connected to DB") : console.log("Error Connecting to DB");

export default db;