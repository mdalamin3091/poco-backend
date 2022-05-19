const mongoose = require("mongoose");
const db = `mongodb://localhost:27017/poco`;
const connectDB = async () =>{
    try {
        await mongoose.connect(db);
        console.log("Connection successfull")
    } catch (error) {
        console.log(error);
        process.exit();
    }
}

module.exports = connectDB