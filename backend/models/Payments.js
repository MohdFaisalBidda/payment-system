import mongoose from "mongoose";

export const paymentsSchema = mongoose.Schema({
  senderName: {
    type: String,
    required: true,
  },
  upiNumber: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  isFraud: {
    type: Boolean,
  },
});

export const Payment = mongoose.model("Payment", paymentsSchema);
