const mongoose = require("mongoose");
// const db = `mongodb://localhost:27017/poco`;
const { DB_URL } = require("../config/envConfig");
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://alamin:maw997i0UDGmYlhm@cluster0.lq4b1.mongodb.net/poco?retryWrites=true&w=majority");
    console.log("Connection successfull");
  } catch (error) {
    console.log(error);
    process.exit(); 
  } 
};

module.exports = connectDB;
