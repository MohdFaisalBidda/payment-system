import express from "express";
import { Fraud } from "../models/Fraud.js";
import { Payment } from "../models/Payments.js";

const router = express.Router();

router.post("/payment", async (req, res) => {
  try {
    const { senderName, upiNumber, transactionId } = req.body;

    const existingPayment = await Payment.exists({ transactionId });

    if (existingPayment) {
      return res.status(200).json({ error: "Transaction already exists" });
    }

    const isFraud = await Fraud.exists({ upiNumber });

    if (isFraud) {
      return res.status(200).json({ error: "UPI ID reported as fraud" });
    }

    const payment = new Payment({
      senderName,
      upiNumber,
      transactionId,
      isFraud:false,
    });

    await payment.save();
    res.status(201).json({ message: "Payment successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error});
  }
});

router.post("/report-fraud", async (req, res) => {
  try {
    const { upiNumber } = req.body;
    const isFraud = await Fraud.exists({ upiNumber });

    if (!isFraud) {
      const fraud = new Fraud({
        upiNumber
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

export default router;
