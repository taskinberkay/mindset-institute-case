const request = require("supertest");
const app = require("../index"); // Import your Express app
const User = require("../models/User");

describe("User API", () => {
    beforeAll(async () => {
        // Clear the User collection before running tests
        await User.deleteMany({});
    });

    it("should register a new user", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send({
                name: "Jane Doe",
                email: "jane.doe@example.com",
                password: "password123",
                role: "SalesRep",
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.message).toBe("User registered successfully");
    });

    it("should log in an existing user", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({
                email: "jane.doe@example.com",
                password: "password123",
            });
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeDefined();
    });

    it("should fail to log in with incorrect credentials", async () => {
        const res = await request(app)
            .post("/api/users/login")
            .send({
                email: "jane.doe@example.com",
                password: "wrongpassword",
            });
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe("Invalid credentials");
    });
});