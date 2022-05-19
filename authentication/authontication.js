const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/envConfig");

const hashPassword = async (password) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};
const comparePassword = async (password, userPassword) => {
  return await bcrypt.compare(password, userPassword);
};
const createToken = async (user) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "2 d" });
};

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
};
