const mongoose = require("mongoose");
const User = require("../models/User");


describe("User Model", () => {
    beforeAll(async () => {
        mongoose.connect("mongodb://mongo:27017/userdb")
            .then(() => console.log("Connected to MongoDB"))
            .catch(err => console.error("MongoDB connection error:", err));
    });
    afterAll(async () => {
        User.deleteMany({});
    })
    it("should create and save a user successfully", async () => {
        const userData = {
            name: "John Doe",
            email: "john.doe@example.com",
            password: "password123",
            role: "Admin",
        };
        const user = new User(userData);
        const savedUser = await user.save();
        console.log(savedUser);
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe(userData.name);
        expect(savedUser.email).toBe(userData.email);
        expect(savedUser.role).toBe(userData.role);
    });

    it("should fail if required fields are missing", async () => {
        const userData = {name: "John Doe"}; // Missing email and password
        const user = new User(userData);
        let err;
        try {
            await user.save();
        } catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    });
});