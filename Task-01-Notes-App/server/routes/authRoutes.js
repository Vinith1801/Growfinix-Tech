const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");

const router = express.Router();
const User = require("../models/User");

// Rate Limiter
const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests, try again later."
});

// Signup
router.post("/signup", authLimiter, async (req, res) => {
  const { email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ msg: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true for production (https)
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Login
router.post("/login", authLimiter, async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ msg: "Login successful" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").status(200).json({ msg: "Logged out" });
});

module.exports = router;
