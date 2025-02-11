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
        ],
        components: {
            securitySchemes: {
                AccessToken: {
                    type: "apiKey",
                    in: "header",
                    name: "x-access-token",
                    description: "Enter your token in the `x-access-token` header",
                },
            },
        },
    },
    apis: [],
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

    for (const service of microservices) {
        try {
            const response = await axios.get(service.url);
            const {paths: servicePaths, components} = response.data;

            Object.assign(paths, servicePaths);
            if (components?.schemas) {
                Object.assign(schemas, components.schemas);
            }

            console.log(`[✔] Loaded API docs from ${service.name}`);
        } catch (error) {
            console.error(`[✖] Failed to fetch docs from ${service.name}:`, error.message);
        }
    }

    swaggerSpec.paths = paths;
    swaggerSpec.components = {schemas};

    return swaggerSpec;
}

async function setupSwagger(app) {
    const spec = await fetchMicroservicesDocs();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));

    app.get("/api-docs-json", async (req, res) => {
        res.json(await fetchMicroservicesDocs());
    });

    console.log("📄 Swagger UI available at http://api-gateway:8080/api-docs");
}

module.exports = setupSwagger;
