const { validationResult } = require("express-validator");
const errorFormater = require("../utils/errorFormater");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../config/envConfig")

// sign up
const signupController = async (req, res) => {
  try {
    const { fullname, email, password, profilePic } = req.body;
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
      profilePic,
      password: await bcrypt.hash(password, 10),
    });
    const token = jwt.sign(
      { id: newUser._id, fullname: newUser.fullname, password: newUser.password },
      JWT_SECRET,
      { expiresIn: "1 d" }
    );
    return res.status(201).json({ msg: "Your account successfully created", newUser, token });
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
      res.status(401).json({
        error: errors.mapped(),
        value: { email, password },
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
          { id: user._id, fullname: user.fullname, password: user.password },
          JWT_SECRET,
          { expiresIn: "1 d" }
        );
        return res.status(200).json({ msg: "Login Successfull", token, user });
      } else {
        return res.status(400).json({error:"password not matched"});
      }
    } else {
      return res.status(401).json({error:"User not Found"});  
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
