const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
    customerId: {type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true},
    updates: [
        {
            status: {type: String, enum: ["New", "In Contact", "Agreement", "Closed"], required: true},
            notes: {type: String, default: ""},
            date: {type: Date, default: Date.now}
        }
    ],
});

module.exports = mongoose.model("Sale", SaleSchema);