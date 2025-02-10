const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/UserRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/users", router);

mongoose.connect("mongodb://mongo:27017/userdb")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(3000, () => console.log("User service running on port 3000"));

module.exports = app;