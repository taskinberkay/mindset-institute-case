const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

describe("User API - Update", () => {
    let user, admin, adminToken, userToken;

    beforeAll(async () => {
        await mongoose.connect("mongodb://mongo:27017/userdb", {useNewUrlParser: true, useUnifiedTopology: true});
        await User.deleteMany({});

        // Create a regular user
        const hashedPassword = await bcrypt.hash("password123", 10);
        user = await User.create({
            name: "Test User",
            email: "user@test.com",
            password: hashedPassword,
            role: "SalesRep",
        });

        // Create an admin user
        admin = await User.create({
            name: "Admin User",
            email: "admin@test.com",
            password: hashedPassword,
            role: "Admin",
        });

        // Generate tokens
        adminToken = jwt.sign({userId: admin._id, role: "Admin"}, process.env.JWT_SECRET, {expiresIn: "12h"});
        userToken = jwt.sign({userId: user._id, role: "SalesRep"}, process.env.JWT_SECRET, {expiresIn: "12h"});
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test("Should update user profile successfully (self-update)", async () => {
        const response = await request(app)
            .put(`/users/update/${user._id}`)
            .set("x-access-token", userToken)
            .send({name: "Updated User"});

        expect(response.status).toBe(200);
        expect(response.body.updatedUser.name).toBe("Updated User");
    });

    test("Should not allow a regular user to update another user", async () => {
        const response = await request(app)
            .put(`/users/update/${admin.id}`)
            .set("x-access-token", userToken)
            .send({name: "Hacker User"});

        expect(response.status).toBe(403);
        expect(response.body.message).toBe("Admin privileges required to update other users' data!");
    });

    test("Should allow an admin to update any user", async () => {
        const response = await request(app)
            .put(`/users/update/${user._id}`)
            .set("x-access-token", adminToken)
            .send({name: "Admin Updated User"});

        expect(response.status).toBe(200);
        expect(response.body.updatedUser.name).toBe("Admin Updated User");
    });

    test("Should return 400 for missing ID in URL", async () => {
        const response = await request(app)
            .put(`/users/update/`)
            .set("x-access-token", adminToken)
            .send({name: "Should Fail"});

        expect(response.status).toBe(404); // Express will return 404 for an invalid route
    });

    test("Should return 404 if user does not exist", async () => {
        const response = await request(app)
            .put(`/users/update/${new mongoose.Types.ObjectId()}`)
            .set("x-access-token", adminToken)
            .send({name: "Nonexistent User"});

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("User not found");
    });
});
