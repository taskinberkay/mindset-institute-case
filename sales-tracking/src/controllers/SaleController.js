const Sale = require("../models/Sale");

const createSale = async (req, res) => {
    const { status, customerId, notes } = req.body;
    const sale = new Sale({ status, customerId, notes });
    await sale.save();
    res.status(201).json(sale);
};

const getSales = async (req, res) => {
    const sales = await Sale.find().populate("customerId");
    res.json(sales);
};

module.exports = { createSale, getSales };