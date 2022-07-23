const mongoose = require("mongoose");
// const db = `mongodb://localhost:27017/poco`;
const { DB_PASS, DB_USER } = require("../config/envConfig");
// const db = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.deaij.mongodb.net/poco?retryWrites=true&w=majority`;
const db = `mongodb+srv://alamin:maw997i0UDGmYlhm@cluster0.lq4b1.mongodb.net/poco?retryWrites=true&w=majority`;
const connectDB = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connection successfull");
  } catch (error) {
    console.log(error);
    process.exit(); 
  } 
};

module.exports = connectDB;
