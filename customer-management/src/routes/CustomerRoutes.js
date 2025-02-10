const express = require('express');
const { createCustomer, getCustomers, updateCustomer, findById} = require('../controllers/CustomerController');
const auth = require('../middlewares/AuthMiddleware');

const router = express.Router();
router.post('', auth, createCustomer);
router.get('', auth, getCustomers);
router.put('/:id', auth, updateCustomer);
router.get('/:id', auth, findById);



module.exports = router;