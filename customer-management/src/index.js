const express = require('express');
const mongoose = require('mongoose');
const customerRoutes = require('./routes/CustomerRoutes');
const swaggerSetup = require('../config/swagger');

const app = express();
swaggerSetup(app);
app.use(express.json());
app.use("/customers", customerRoutes);

mongoose.connect("mongodb://mongo:27017/customerdb")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err));

app.listen(3001, () => console.log("Customer service running on port 3001"));

module.exports = app;