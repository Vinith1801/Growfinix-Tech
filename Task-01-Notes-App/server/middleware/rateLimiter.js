const rateLimit = require("express-rate-limit");

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Too many requests, please try again later.",
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = authLimiter;
