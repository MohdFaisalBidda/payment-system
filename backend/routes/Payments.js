import express from "express";
import { Fraud } from "../models/Fraud.js";
import { User } from "../models/User.js";
import { Payment } from "../models/Payments.js";
import { GeneratedOTP } from "../constants/constant.js";

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const { senderName, upiNumber, transactionId } = req.body;

    const existingPayment = await Payment.findOne({ transactionId });

    if (existingPayment) {
      return res.json("Transaction already exists");
    }

    const isFraud = await Fraud.findOne({ upiNumber: upiNumber });

    if (isFraud) {
      return res.json("UPI ID is fraud");
    }

    const payment = new Payment({
      senderName,
      upiNumber,
      transactionId,
      isFraud: false,
    });

    await payment.save();
    res
      .status(201)
      .json("Payment pending verify by providing 4 digit OTP");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post("/report-fraud", async (req, res) => {
  try {
    const { upiNumber } = req.body;
    const username = await getUsernameByUPI(upiNumber);
    if (!username) {
      return res
        .status(500)
        .json({ error: "Username not found for the given UPI number" });
    }
    const isFraud = await Fraud.exists({ upiNumber });

    if (!isFraud) {
      const fraud = new Fraud({
        upiNumber,
        username,
      });
      await fraud.save();
      res.status(201).json({ message: "Fraud Reported successful" });
    } else {
      res.status(200).json({ error: "UPI ID is already reported as fraud" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { otp, upiNumber } = req.body;
  const user = await User.findOne({ upiNumber });

  if (user && GeneratedOTP === otp) {
    const isFraudulent = await Fraud.findOne({ upiNumber: user.upiNumber });
    if (isFraudulent) {
      res.status(401).json( "Fraudulent transaction");
    } else {
      res.status(200).json("Payment Successful");
    }
  } else {
    res.status(500).json("Invalid OTP");
  }
});

async function getUsernameByUPI(upiNumber) {
  const user = await Payment.findOne({ upiNumber });
  return user ? user.senderName : null;
}

export default router;
