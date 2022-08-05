const mongoose = require("mongoose");
// const db = `mongodb://localhost:27017/poco`;
const { DB_URL } = require("../config/envConfig");
const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL);
    console.log("Connection successfull");
  } catch (error) {
    console.log(error);
    process.exit(); 
  } 
};

module.exports = connectDB;
