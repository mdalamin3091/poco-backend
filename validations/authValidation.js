const { body } = require("express-validator");
const User = require("../models/User");
const signupValidation = [
  body("fullname")
    .not()
    .isEmpty()
    .escape()
    .trim()
    .withMessage("fullname is required"),
  body("email")
    .not()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        return Promise.reject("Email already use");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 characters long"),
];

const loginValidation = [
  body("email")
    .isEmail()
    .withMessage("Email is required")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (!user) {
        return Promise.reject("Email not found");
      }
    })
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("password should be 6 characters long"),
];

module.exports = {
  signupValidation,
  loginValidation,
};
