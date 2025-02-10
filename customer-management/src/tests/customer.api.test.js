const request = require("supertest");
const API_GATEWAY_URL = "http://api-gateway:8080";

describe("Customer Service API Tests", () => {
    let validToken, user, customerId;

    beforeAll(async () => {
        const registerResponse = await request(API_GATEWAY_URL)
            .post("/users/register")
            .send({
                name: "Admin User",
                email: "customer-manager@test.com",
                password: "password123",
                role: "Admin",
            });

        user = registerResponse.body.savedUser;

        const loginResponse = await request(API_GATEWAY_URL)
            .post("/users/login")
            .send({email: "customer-manager@test.com", password: "password123"});

        validToken = loginResponse.body.token;

        const customerResponse = await request(API_GATEWAY_URL)
            .post("/customers")
            .set("x-access-token", validToken)
            .send({
                name: "John Doe",
                email: "john@example.com",
                phone: "1234567890",
                company: "Example Corp",
                notes: ["Initial note"],
            });
        customerId = customerResponse.body.savedCustomer._id;
    });

    afterAll(async () => {
        await request(API_GATEWAY_URL)
            .delete(`/users/${user._id}`)
            .set("x-access-token", validToken)
            .send();
    });

    test("Should retrieve customers with a valid token", async () => {
        const res = await request(API_GATEWAY_URL)
            .get("/customers")
            .set("x-access-token", validToken);

        expect(res.statusCode).toBe(200);
    });

    test("Should reject access with an invalid token", async () => {
        const res = await request(API_GATEWAY_URL)
            .get("/customers")
            .set("x-access-token", "invalid_token");

        expect(res.statusCode).toBe(403);
    });

    test("Should reject access with no token", async () => {
        const res = await request(API_GATEWAY_URL)
            .get("/customers");

        expect(res.statusCode).toBe(401);
    });

    test("Should update a customer entry", async () => {
        const updateResponse = await request(API_GATEWAY_URL)
            .put(`/customers/${customerId}`)
            .set("x-access-token", validToken)
            .send({
                name: "John Updated",
                email: "updated@example.com",
                phone: "9876543210",
                company: "Updated Corp",
                notes: ["Updated note"],
            });

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.name).toBe("John Updated");
        expect(updateResponse.body.email).toBe("updated@example.com");
    });

    test("Should return 404 for updating a non-existent customer", async () => {
        const res = await request(API_GATEWAY_URL)
            .put("/customers/654321abcdef123456789012") // Random non-existent ID
            .set("x-access-token", validToken)
            .send({
                name: "Non-existent User",
            });

        expect(res.statusCode).toBe(404);
    });

    test("Should reject access with an invalid token", async () => {
        const res = await request(API_GATEWAY_URL)
            .get(`/customers/${customerId}`)
            .set("x-access-token", "invalid_token");

        expect(res.statusCode).toBe(403);
    });

    test("Should reject access with no token", async () => {
        const res = await request(API_GATEWAY_URL)
            .get(`/customers/${customerId}`)

        expect(res.statusCode).toBe(401);
    });

    test("Should return the queried customer", async () => {
        const updateResponse = await request(API_GATEWAY_URL)
            .get(`/customers/${customerId}`)
            .set("x-access-token", validToken);

        expect(updateResponse.statusCode).toBe(200);
        expect(updateResponse.body.email).toBe("updated@example.com");
    });

    test("Should return 404 for updating a non-existent customer", async () => {
        const res = await request(API_GATEWAY_URL)
            .put("/customers/654321abcdef123456789012") // Random non-existent ID
            .set("x-access-token", validToken)
            .send({
                name: "Non-existent User",
            });

        expect(res.statusCode).toBe(404);
    });
});