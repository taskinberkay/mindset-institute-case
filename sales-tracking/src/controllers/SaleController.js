const Sale = require("../models/Sale");

exports.createSale = async (req, res) => {
    try {
        const {customerId, notes} = req.body;
        const newSale = new Sale({
            customerId,
            updates: [{status: "New", notes: notes || "Sale created", date: new Date()}],
        });

        await newSale.save();
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({message: "Error creating sale", error});
    }
};

exports.inContactUpdate = async (req, res) => {
    await updateSaleStatus(req, res, "In Contact", "Customer contacted.");
};

exports.agreementUpdate = async (req, res) => {
    await updateSaleStatus(req, res, "Agreement", "Agreement reached.");
};

exports.closedUpdate = async (req, res) => {
    await updateSaleStatus(req, res, "Closed", "Sale closed.");
};

const updateSaleStatus = async (req, res, newStatus, defaultNote) => {
    try {
        const {id} = req.params;
        const {notes} = req.body;

        const sale = await Sale.findById(id);
        if (!sale) {
            return res.status(404).json({message: "Sale not found"});
        }

        sale.updates.push({status: newStatus, notes: notes || defaultNote, date: new Date()});
        await sale.save();

        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({message: `Error updating sale to ${newStatus}`, error});
    }
};

exports.findAll = async (req, res) => {
    try {
        const sales = await Sale.find();
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({message: "Error retrieving sales", error});
    }
};

exports.findById = async (req, res) => {
    try {
        const {id} = req.params;
        console.log(id);
        const sale = await Sale.findById(id);

        if (!sale) {
            return res.status(404).json({message: "Sale not found"});
        }

        res.status(200).json(sale);
    } catch (error) {
        res.status(500).json({message: "Error retrieving sale", error});
    }
};
