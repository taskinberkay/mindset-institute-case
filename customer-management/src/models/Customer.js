const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: String, required: true },
    notes: { type: [String], default: [] },
});

module.exports = mongoose.model("Customer", CustomerSchema);