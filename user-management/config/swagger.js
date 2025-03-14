const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Options for swagger-jsdoc
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "User Management API",
            version: "1.0.0",
            description: "API documentation for user management service",
        },
        servers: [{url: "http://user-management:3000"}],
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
                User: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: {
                            type: "string",
                            description: "User's full name",
                        },
                        email: {
                            type: "string",
                            format: "email",
                            description: "User's email address",
                        },
                        password: {
                            type: "string",
                            format: "password",
                            description: "User's password (hashed in storage)",
                        },
                        role: {
                            type: "string",
                            enum: ["Admin", "SalesRep"],
                            default: "SalesRep",
                            description: "User's role for authorization purposes",
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
    console.log("📄 Swagger UI available at http://user-management:3000/api-docs");
};

module.exports = setupSwagger;