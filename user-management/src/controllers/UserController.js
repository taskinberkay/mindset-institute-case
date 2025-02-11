const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const {name, email, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({name, email, password: hashedPassword, role});
        const savedUser = await user.save();
        res.status(201).json({message: "User registered successfully", savedUser});
    } catch (err) {
        res.status(500).json({error: err});
    }

};

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({userId: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: "12h"});
        res.json({token});
    } catch (err) {
        res.status(500).json({error: err});
    }

};

const findById = async (req, res) => {
    try {
        const userId = req.params.id; // Get the user ID from the request parameters
        if (!req.headers["x-is-admin"] && req.headers["x-user-id"] !== userId) {
            return res.status(403).json({message: "Access denied."});
        }
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        // Return the user details
        res.json(user);
    } catch (error) {
        console.error("Error finding user by ID:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const findByParams = async (req, res) => {
    try {
        const params = req.body;

        if (!req.headers["x-is-admin"]) {
            return res.status(401).json({message: "Admin privileges required to list Users!"});
        }

        if (!params || Object.keys(params).length === 0) {
            return res.status(400).json({message: "No search parameters provided"});
        }

        const allowedFields = ["name", "email", "role"];
        const sanitizedParams = Object.keys(params)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = params[key];
                return obj;
            }, {});

        const users = await User.find(sanitizedParams).select("-password");

        return res.status(200).json(users);
    } catch (error) {
        console.error("Error finding user by params:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const update = async (req, res) => {
    try {
        const userId = req.params.id; // Get the ID from the URL
        if (!userId) {
            return res.status(400).json({message: "Missing ID parameter in URL!"});
        }

        // Ensure non-admin users can only update their own data
        if (!req.headers["x-is-admin"]) {
            if (req.headers["x-user-id"] !== String(userId)) {
                return res.status(403).json({message: "Admin privileges required to update other users' data!"});
            }
        }

        // Prepare update data
        const updateData = {...req.body};
        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        // Perform the update
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {new: true}).select("-password");

        if (!updatedUser) {
            return res.status(404).json({message: "User not found"});
        }

        res.status(200).json({message: "User updated successfully", updatedUser});
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({message: "Internal server error"});
    }
};

const deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const isAdmin = req.headers["x-is-admin"];
        const requesterId = req.headers["x-user-id"];

        if (!isAdmin && requesterId !== id) {
            return res.status(403).json({error: "Forbidden: You can only delete your own account"});
        }

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({error: "User not found"});
        }

        res.status(200).json({message: "User deleted successfully", deletedUser});
    } catch (error) {
        console.error("[UserController] Error deleting user:", error);
        res.status(500).json({error: "Internal Server Error"});
    }
};


module.exports = {register, login, findById, findByParams, update, deleteUser};