const rateLimit = require("express-rate-limit");

const { HttpCode } = require("./constants");

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour window
  max: 2, // start blocking after 5 requests
  handler: (req, res, next) => {
    res.status(HttpCode.BAD_REQUEST).json({
      status: "Error",
      code: HttpCode.BAD_REQUEST,
      message:
        "Too many accounts created from this IP, please try again after an hour",
    });
  },
});

module.exports = { createAccountLimiter };
