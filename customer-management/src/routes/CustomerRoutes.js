const express = require('express');
const { createCustomer, getCustomers} = require('../controllers/CustomerController');

const router = express.Router();
router.post('/customers', createCustomer);
router.get('/customers', getCustomers);

module.exports = router;