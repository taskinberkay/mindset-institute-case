const Customer = require("../models/Customer");

const createCustomer = async (req, res) => {
    const {name, email, phone, company, notes} = req.body;
    const customer = new Customer({name, email, phone, company, notes});
    res.json(await customer.save());
}

const getCustomers = async (req, res) => {
    const customers = await Customer.find();
    res.json(customers);
}

module.exports = {createCustomer, getCustomers}