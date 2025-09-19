const path = require("path");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const logger = require("../utils/logger.util");

/**
 * Swagger definition
 */
const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Portfolio Backend API",
        version: "1.0.0",
        description: "API documentation for Portfolio website backend",
    },
    servers: [
        {
            url: `${process.env.BASE_URL}:${process.env.PORT}`,
            description: "Development server",
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [{ bearerAuth: [] }],
};

/**
 * Options for swagger-jsdoc
 */
const options = {
    swaggerDefinition,
    apis: [path.join(__dirname, "../../docs/*.js")], // <-- FIXED PATH
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Setup Swagger UI
 * @param {import('express').Application} app
 */
const setupSwagger = (app) => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    logger.info(
        `Swagger docs available at ${process.env.BASE_URL}:${process.env.PORT}/api-docs`
    );
};

module.exports = setupSwagger;
