const express = require("express");
const app = express();
const PORT = PORT || 5000;
const cors = require("cors");
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const productRoutes = require("./routes/productRoutes");
const { PORT } = require("./config/envConfig");

// parsor
app.use(cors())
app.use(express.json())

// connect DB
connectDB() 

// routes 
app.use('/api/v1/auth', authRoutes) 
app.use('/api/v1/category', categoryRoutes) 
app.use('/api/v1/product', productRoutes) 

app.get("/", (req, res) => res.send("In the name of Allah"));

app.listen(PORT, () => console.log(`server running port: ${PORT}`));
