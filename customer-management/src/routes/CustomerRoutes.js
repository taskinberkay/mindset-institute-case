const express = require('express');
const { createCustomer, getCustomers} = require('../controllers/CustomerController');
const auth = require('../middlewares/AuthMiddleware');

const router = express.Router();
router.post('/customers', auth, createCustomer);
router.get('/customers', auth, getCustomers);

module.exports = router;