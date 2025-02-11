/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management API
 */

const express = require("express");
const {
    register,
    login,
    findById,
    findByParams,
    update,
    deleteUser,
} = require("../controllers/UserController");
const checkForAdminPrivileges = require("../middlewares/VerifyAdminMiddleware");

const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               role:
 *                 type: string
 *                 enum: [User, Admin]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
router.post("/login", login);

/**
 * @swagger
 * /users/findById/{id}:
 *   get:
 *     summary: Get a user by ID (Admin or self only)
 *     tags: [Users]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.get("/:id", checkForAdminPrivileges, findById);

/**
 * @swagger
 * /users/findByParams:
 *   post:
 *     summary: Find users by parameters (Admin only)
 *     tags: [Users]
 *     security:
 *       - AccessToken: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: List of matching users
 *       403:
 *         description: Forbidden
 */
router.post("/findByParams", checkForAdminPrivileges, findByParams);

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update a user's details (Admin or self only)
 *     tags: [Users]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [User, Admin]
 *     responses:
 *       200:
 *         description: User updated successfully
 *       403:
 *         description: Forbidden
 */
router.put("/update/:id", checkForAdminPrivileges, update);

/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user (Admin or self only)
 *     tags: [Users]
 *     security:
 *       - AccessToken: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       403:
 *         description: Forbidden
 *       404:
 *         description: User not found
 */
router.delete("/delete/:id", checkForAdminPrivileges, deleteUser);

module.exports = router;
