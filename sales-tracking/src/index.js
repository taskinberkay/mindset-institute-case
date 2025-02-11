const express = require("express");
const mongoose = require("mongoose");
const saleRoutes = require("./routes/SaleRoutes");
const swaggerSetup = require('../config/swagger');

const app = express();
swaggerSetup(app);
app.use(express.json());
app.use("/sales", saleRoutes);

mongoose.connect("mongodb://mongo:27017/saledb")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(3002, () => console.log("Sales service running on port 3002"));