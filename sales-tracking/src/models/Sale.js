const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema({
    status: { type: String, enum: ["New", "In Contact", "Agreement", "Closed"], default: "New" },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true },
    notes: { type: String, default: "" },
    timestamps: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Sale", SaleSchema);