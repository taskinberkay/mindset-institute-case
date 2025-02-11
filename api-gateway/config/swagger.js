const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const axios = require("axios");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Gateway Documentation",
            version: "1.0.0",
            description: "Aggregated API documentation for all microservices",
        },
        servers: [
            {
                url: "http://api-gateway:8080",
                description: "API Gateway (inside Docker)",
            },
            {
                url: "http://localhost:8080",
                description: "API Gateway (for local testing)",
            },
        ],
        components: {
            securitySchemes: {
                AccessToken: {
                    type: "apiKey",
                    in: "header",
                    name: "x-access-token",
                    description: "Enter your authentication token",
                },
            },
        },
    },
    apis: [], // No local API files, we fetch from microservices
};

const swaggerSpec = swaggerJsdoc(options);

async function fetchMicroservicesDocs() {
    const microservices = [
        {name: "User Management", url: "http://user-management:3000/api-docs-json"},
        {name: "Customer Management", url: "http://customer-management:3001/api-docs-json"},
        {name: "Sales Tracking", url: "http://sales-tracking:3002/api-docs-json"},
    ];

    const paths = {};
    const schemas = {};
    const securitySchemes = {};

    for (const service of microservices) {
        try {
            const response = await axios.get(service.url);
            const {paths: servicePaths, components} = response.data;

            // Merge paths
            Object.assign(paths, servicePaths);

            // Merge schemas
            if (components?.schemas) {
                Object.assign(schemas, components.schemas);
            }

            // Merge security schemes
            if (components?.securitySchemes) {
                Object.assign(securitySchemes, components.securitySchemes);
            }

            console.log(`[✔] Loaded API docs from ${service.name}`);
        } catch (error) {
            console.error(`[✖] Failed to fetch docs from ${service.name}:`, error.message);
        }
    }

    swaggerSpec.paths = paths;
    swaggerSpec.components = {
        schemas,
        securitySchemes,
    };

    return swaggerSpec;
}

async function setupSwagger(app) {
    const spec = await fetchMicroservicesDocs();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

    app.get("/api-docs-json", async (req, res) => {
        res.json(await fetchMicroservicesDocs());
    });

    console.log("📄 Swagger UI available at http://localhost:8080/api-docs");
}

module.exports = setupSwagger;
