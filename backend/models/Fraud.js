import mongoose from "mongoose";

const fraudSchema = new mongoose.Schema({
    username:String,
    upiNumber: String,
  });
  
export const Fraud = mongoose.model('Fraud', fraudSchema);