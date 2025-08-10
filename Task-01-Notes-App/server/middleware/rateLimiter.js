const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    msg: 'Too many requests from this IP, please try again after a minute'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false,  // Disable the `X-RateLimit-*` headers
});

module.exports = authLimiter;
