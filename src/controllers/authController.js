import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/User.js";




//Register api
 // setps for register
    // 1.take all inputs from user
    // 2.check all inputs are entered or not
    // 3.check if user is alrdey exist
    // 4.then hash password
    // 5.create new user
export const register = async (req, res) => {
  try {
   
    // step 1
    const { name, email, password } = req.body;

    // step 2
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fileds are required" });
    }

    // step 3
    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: "user All ready exist" });

    // step 4
    const hashedPassword = await bcrypt.hash(password, 10);

    // step 5
   const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

//Login Api
//Steps to write Login Api
  // 1. take input from user email and pass
  // 2. check email match is present in db or not
  // 3. decrypt pass
  // 4. match password
  // 5. generate jwt 
export const login = async (req, res) => {
  try {
    const JWT_SECRET =process.env.JWT_SECRET;
    const { email, password } = req.body;

    // Step 1: Check for user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    // Step 2: Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    // Step 3: Generate token
    const token = jwt.sign({ userId: user._id },JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error('Login error:', error.message); 
    res.status(500).json({ message: 'Server error' });
  }
}; 
