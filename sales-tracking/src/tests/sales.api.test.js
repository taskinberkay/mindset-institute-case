const request = require("supertest");

const API_GATEWAY_URL = "http://api-gateway:8080";

describe("Customer Service API Tests", () => {
    let validToken, user, customerId, saleId;

    beforeAll(async () => {

        const registerResponse = await request(API_GATEWAY_URL)
            .post("/users/register")
            .send({
                name: "Admin User",
                email: "sales-admin@test.com",
                password: "password123",
                role: "Admin",
            });

        user = registerResponse.body.savedUser;

        const loginResponse = await request(API_GATEWAY_URL)
            .post("/users/login")
            .send({email: "sales-admin@test.com", password: "password123"});

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

        const saleResponse = await request(API_GATEWAY_URL)
            .post("/sales")
            .set("x-access-token", validToken)
            .send({customerId});

        saleId = saleResponse.body._id;
    });

    afterAll(async () => {
        await request(API_GATEWAY_URL)
            .delete(`/users/${user._id}`)
            .set("x-access-token", validToken)
            .send();
    });

    test("Should retrieve all sales", async () => {
        const res = await request(API_GATEWAY_URL)
            .get("/sales")
            .set("x-access-token", validToken);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test("Should retrieve a sale by ID", async () => {
        const res = await request(API_GATEWAY_URL)
            .get(`/sales/${saleId}`)
            .set("x-access-token", validToken);

        expect(res.statusCode).toBe(200);
        expect(res.body._id).toBe(saleId);
    });

    test("Should return 404 for non-existent sale ID", async () => {
        const res = await request(API_GATEWAY_URL)
            .get("/sales/654321abcdef123456789012")
            .set("x-access-token", validToken);

        expect(res.statusCode).toBe(404);
    });

    test("Should return 401 if no token is provided for retrieving sales", async () => {
        const res = await request(API_GATEWAY_URL).get("/sales");
        expect(res.statusCode).toBe(401);
    });
});
