const express = require("express");
const mongoose = require("mongoose");
const verifyAdmin = require("./middlewares/VerifyAdminMiddleware");
const router = require("./routes/UserRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use((req, res, next) => {
    console.log(`[Gateway] Incoming Request: ${req.method} ${req.originalUrl} ${req.body}`);
    next();
});
app.use("/users", router);

mongoose.connect("mongodb://mongo:27017/userdb")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(3000, () => console.log("User service running on port 3000"));

module.exports = app;