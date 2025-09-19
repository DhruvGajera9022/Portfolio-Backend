const cors = require("cors");
const { HTTP_STATUS } = require("../../shared/constants")

/**
 * CORS Options
 */
const corsOptions = {
    origin: process.env.CORS_ORIGIN || "*", // Allow all origins if not specified
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies/auth headers
    optionsSuccessStatus: HTTP_STATUS.OK, // Some legacy browsers (IE11, SmartTVs) choke on 204
};

/**
 * Export CORS middleware
 */
const corsMiddleware = cors(corsOptions);

module.exports = corsMiddleware;
