require("dotenv").config();

const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const errorHandler = require("./middleware/errorHandler.middleware");
const corsMiddleware = require("./config/cors.config");
const setupSwagger = require("./config/swagger.config");
const { limiter } = require("./middleware/rateLimiter.middleware");
const { errorResponse } = require("./utils/response.util");
const { HTTP_STATUS } = require("../shared/constants")

const authRoutes = require("./routes/auth.route");
const profileRoutes = require("./routes/profile.route");
const skillsRoutes = require("./routes/skills.route");


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
app.use("/api/profile", profileRoutes);
app.use("/api/skills", skillsRoutes);

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
