/**
 * @swagger
 * tags:
 *   name: Sales
 *   description: API for tracking sales
 */

const express = require("express");
const router = express.Router();
const SaleController = require("../controllers/SaleController");
const authMiddleware = require("../middlewares/AuthMiddleware");

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Create a new sale
 *     tags: [Sales]
 *     security:
 *       - AccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: ID of the customer associated with the sale
 *               notes:
 *                 type: string
 *                 description: Initial notes for the sale
 *     responses:
 *       201:
 *         description: Sale created successfully
 *       400:
 *         description: Bad request
 */
router.post("", authMiddleware, SaleController.createSale);

/**
 * @swagger
 * /sales/{id}/in-contact:
 *   put:
 *     summary: Update sale status to "In Contact"
 *     tags: [Sales]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 description: Notes for the update
 *     responses:
 *       200:
 *         description: Sale updated successfully
 *       404:
 *         description: Sale not found
 */
router.put("/:id/in-contact", authMiddleware, SaleController.inContactUpdate);

/**
 * @swagger
 * /sales/{id}/agreement:
 *   put:
 *     summary: Update sale status to "Agreement"
 *     tags: [Sales]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 description: Notes for the update
 *     responses:
 *       200:
 *         description: Sale updated successfully
 *       404:
 *         description: Sale not found
 */
router.put("/:id/agreement", authMiddleware, SaleController.agreementUpdate);

/**
 * @swagger
 * /sales/{id}/closed:
 *   put:
 *     summary: Update sale status to "Closed"
 *     tags: [Sales]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sale ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               notes:
 *                 type: string
 *                 description: Notes for the update
 *     responses:
 *       200:
 *         description: Sale updated successfully
 *       404:
 *         description: Sale not found
 */
router.put("/:id/closed", authMiddleware, SaleController.closedUpdate);

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Get all sales
 *     tags: [Sales]
 *     security:
 *       - AccessToken: []
 *     responses:
 *       200:
 *         description: List of all sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Sale'
 *       403:
 *         description: Unauthorized
 */
router.get("", authMiddleware, SaleController.findAll);

/**
 * @swagger
 * /sales/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     tags: [Sales]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The sale ID
 *     responses:
 *       200:
 *         description: Sale details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Sale'
 *       404:
 *         description: Sale not found
 */
router.get("/:id", authMiddleware, SaleController.findById);

module.exports = router;
