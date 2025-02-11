const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Options for swagger-jsdoc
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Customer Management API",
            version: "1.0.0",
            description: "API documentation for the customer management service",
        },
        servers: [{url: "http://customer-management:3001"}],
        components: {
            securitySchemes: {
                AccessToken: {
                    type: "apiKey",
                    in: "header",
                    name: "x-access-token",
                    description: "Enter your token in the `x-access-token` header",
                },
            },
            schemas: {
                Customer: {
                    type: "object",
                    required: ["name", "email", "phone", "company"],
                    properties: {
                        name: {
                            type: "string",
                            description: "Customer's full name",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "Customer's email address",
                        },
                        phone: {
                            type: "string",
                            description: "Customer's phone number",
                        },
                        company: {
                            type: "string",
                            description: "Company the customer is associated with",
                        },
                        notes: {
                            type: "array",
                            items: {
                                type: "string",
                            },
                            description: "Additional notes about the customer",
                        },
                    },
                },
            },
        },
    },
    apis: ["./src/routes/*.js"],
};

// Generate the OpenAPI specification
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api-docs-json", (req, res) => {
        res.json(swaggerSpec);
    });
    console.log("📄 Swagger UI available at http://customer-management:3001/api-docs");
};

module.exports = setupSwagger;
