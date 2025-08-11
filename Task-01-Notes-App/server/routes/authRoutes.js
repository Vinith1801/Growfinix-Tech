const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const verifyToken = require("../middleware/authMiddleware");
const authLimiter = require('../middleware/rateLimiter');

// Auth Routes
router.post("/signup", authLimiter , authController.signup);
router.post("/login", authLimiter , authController.login);
router.post("/logout", authController.logout);

// Get current user
router.get("/me", verifyToken, authController.getMe);
router.put("/me", verifyToken, authController.updateMe);


module.exports = router;
