const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Options for swagger-jsdoc
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Sales Tracking API",
            version: "1.0.0",
            description: "API documentation for the sales tracking service",
        },
        servers: [{url: "http://sales-tracking:3002"}],
        components: {
            securitySchemes: {
                AccessToken: {
                    type: "apiKey",
                    in: "header",
                    name: "x-access-token",
                    description: "Enter your authentication token",
                },
            },
            schemas: {
                Sale: {
                    type: "object",
                    required: ["customerId", "updates"],
                    properties: {
                        customerId: {
                            type: "string",
                            description: "ID of the associated customer",
                        },
                        updates: {
                            type: "array",
                            items: {
                                type: "object",
                                properties: {
                                    status: {
                                        type: "string",
                                        enum: ["New", "In Contact", "Agreement", "Closed"],
                                    },
                                    notes: {
                                        type: "string",
                                    },
                                    date: {
                                        type: "string",
                                        format: "date-time",
                                    },
                                },
                            },
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
    console.log("📄 Swagger UI available at http://sales-tracking:3002/api-docs");
};

module.exports = setupSwagger;