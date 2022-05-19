const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes")

// parsor
app.use(express.json())
app.use(cors())

// connect DB
connectDB()

// routes 
app.use('/auth', authRoutes) 
app.use('/category', categoryRoutes) 
app.use('/product', productRoutes) 

app.get("/", (req, res) => res.send("In the name of Allah"));

app.listen(PORT, () => console.log(`server running port: ${PORT}`));
