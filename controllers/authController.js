const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const User = require("../models/User");
const {
  hashPassword,
  comparePassword,
  createToken,
} = require("../authentication/authontication");
// sign up
const signupController = async (req, res) => {
  try {
    const { fullname, email, password} = req.body;
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      res.json({
        error: errors.mapped(),
        value: { fullname, email, password },
      });
    }
    const newUser = await User.create({
      fullname,
      email,
      password: await hashPassword(password),
    });
    console.log(newUser);
    const token = createToken({
      id: newUser._id,
      fullname: newUser.fullname,
      password: newUser.password,
    });
    return res.status(201).json("Successfully user created", token);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
// login
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const errors = validationResult(req).formatWith(errorFormater);
    if (!errors.isEmpty()) {
      res.json({
        error: errors.mapped(),
        value: { email, password },
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      if (await comparePassword(password, user.password)) {
        const token = createToken({
          id: user._id,
          fullname: user.fullname,
          password: user.password,
        }); 
        console.log(user, token)  
        res.status(200).json("Login Successfull", token);
      } else {
        return res.status(400).json("password not Found");
      }
    } else {
      return res.status(400).json("Email not Found"); 
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  signupController,
  loginController,
};
