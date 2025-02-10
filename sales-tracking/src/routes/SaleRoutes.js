const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/SaleController");
const authMiddleware = require("../middlewares/AuthMiddleware");

router.post("", authMiddleware, SaleController.createSale);
router.put("/:id/in-contact", authMiddleware, SaleController.inContactUpdate);
router.put("/:id/agreement", authMiddleware, SaleController.agreementUpdate);
router.put("/:id/closed", authMiddleware, SaleController.closedUpdate);
router.get("", authMiddleware, SaleController.findAll);
router.get("/:id", authMiddleware, SaleController.findById);

module.exports = router;