const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { JWT_SECRET } = require("../config/config");

// Cookie Options
const getCookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "None",
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});

// Signup Controller
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6)
    return res.status(400).json({ msg: "Invalid input" });

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ msg: "Email already registered" });

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ email, password: hashed });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, getCookieOptions());
    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

    res.cookie("token", token, getCookieOptions());
    res.status(200).json({ msg: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get Current User
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Logout Controller
exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ msg: "Logged out" });
};

// Update current user's profile
exports.updateMe = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email, password, currentPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Update username & email directly
    if (username) user.username = username;
    if (email) user.email = email;

    // Handle password change
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ msg: "Current password is required" });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ msg: "Current password is incorrect" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({ msg: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Failed to update profile" });
  }
};

exports.verifyPassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentPassword } = req.body;

    if (!currentPassword) {
      return res.status(400).json({ msg: "Current password is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Incorrect current password" });
    }

    res.json({ msg: "Password verified" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
