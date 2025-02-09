const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "User Management API",
        version: "1.0.0",
        description: "API for managing users",
    },
    servers: [
        {
            url: "http://localhost:3000", // Update with your server URL
            description: "Development server",
        },
    ],
};

// Options for swagger-jsdoc
const options = {
    swaggerDefinition,
    apis: ["./src/routes/*.js"], // Path to the API routes
};

// Generate the OpenAPI specification
const swaggerSpec = swaggerJsdoc(options);

// Serve Swagger UI
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = setupSwagger;