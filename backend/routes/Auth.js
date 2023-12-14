import express from "express";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router =express.Router();

router.get("/users",async(req,res)=>{
  try {
    const users =await User.find()
    res.status(200).json({users});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
})

router.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;
      const hashedPass = await bcrypt.hash(password, 10);

      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
  
      const newUser = new User({
        username,
        password: hashedPass,
      });
  
      await newUser.save();
      res.status(201).json({ message: "User created!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
  router.post("/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const passMatch = await bcrypt.compare(password, user.password);
  
      if (!passMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, "Secret_Key", {
        expiresIn: "1h",
      });
  
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });


export default router;