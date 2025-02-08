const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/CustomerRoutes');

const app = express();
app.use(express.json());
app.use("/api", customerRoutes);

mongoose.connect("mongodb://localhost:27017/customerdb", {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(3001, () => console.log("Customer service running on port 3001"));