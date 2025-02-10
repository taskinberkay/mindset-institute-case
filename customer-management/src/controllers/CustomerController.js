const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
    const {name, email, phone, company, notes} = req.body;
    const customer = new Customer({name, email, phone, company, notes});
    const savedCustomer = await customer.save();
    res.status(201).json({message: "Customer saved successfully.", savedCustomer});
}

const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
}

const updateCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!updatedCustomer) {
            return res.status(404).json({message: "Customer not found"});
        }

        res.status(200).json(updatedCustomer);
    } catch (error) {
        res.status(500).json({message: "Error updating customer", error});
    }
};

const findById = async (req, res) => {
    try {
        const id = req.params.id;
        const customer = await Customer.findById(id);

        if (!customer) {
            return res.status(404).json({message: "Customer not found"});
        }

        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({message: "Error querying customer", error});
    }
};

module.exports = {createCustomer, getCustomers, updateCustomer, findById}