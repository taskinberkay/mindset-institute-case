const express = require('express');
const { createSale, getSales } = require('../controllers/SaleController');

const router = express.Router();
router.get('/sales', getSales);
router.post('/sales', createSale);

module.exports = router;