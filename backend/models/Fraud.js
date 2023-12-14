import mongoose from "mongoose";

const fraudSchema = new mongoose.Schema({
    upiNumber: String,
  });
  
export const Fraud = mongoose.model('Fraud', fraudSchema);