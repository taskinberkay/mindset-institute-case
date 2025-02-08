const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

mongoose.connect("mongodb://mongo:27017/userdb", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(3000, () => console.log("User service running on port 3000"));