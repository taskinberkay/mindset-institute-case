const express = require("express");
const mongoose = require("mongoose");
const saleRoutes = require("./routes/SaleRoutes");

const app = express();
app.use(express.json());
app.use("/api", saleRoutes);

mongoose.connect("mongodb://mongo:27017/saledb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(3002, () => console.log("Sales service running on port 3002"));