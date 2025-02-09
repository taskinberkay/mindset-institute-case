const express = require('express');
const { createSale, getSales } = require('../controllers/SaleController');
const auth = require('../middlewares/AuthMiddleware');

const router = express.Router();
router.get('/sales', auth, getSales);
router.post('/sales', auth, createSale);

module.exports = router;