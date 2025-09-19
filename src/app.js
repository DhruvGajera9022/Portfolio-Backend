require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");


const errorHandler = require("./middleware/errorHandler.middleware");
const { limiter } = require("./middleware/rateLimiter.middleware");
const corsMiddleware = require("./config/cors.config");
const logger = require("./utils/logger.util");
const { errorResponse } = require("./utils/response.util");
const { HTTP_STATUS } = require("../shared/constants")
const setupSwagger = require("./config/swagger.config");

const authRoutes = require("./routes/auth.route");

const app = express();


// ------------------- MIDDLEWARE ------------------- //

// Security headers
app.use(helmet());

// Enable CORS
app.use(corsMiddleware);

// Rate Limiting
app.use(limiter);

// Parse JSON & URL-encoded payloads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// HTTP request logging
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev")); // Logs to console
}

// Example route
app.get("/", (req, res) => res.send("API Running"));

// ------------------- ROUTES ------------------- //
app.use("/api/auth", authRoutes);

// Setup Swagger
setupSwagger(app);

// 404 handler for unknown routes
app.use((req, res, next) => {
    return errorResponse(res, {
        statusCode: HTTP_STATUS.NOT_FOUND,
        message: "Route not found",
    });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
