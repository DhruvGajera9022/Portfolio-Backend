/**
 * server.js
 * Entry point of the backend server
 */

require("dotenv").config(); // Load environment variables

const http = require("http");
const app = require("./src/app");
const logger = require("./src/utils/logger.util");

const connectDB = require("./src/config/database.config");

// Get port from environment or default to 5000
const PORT = process.env.PORT;

// Connect to Database
connectDB();


// Create HTTP server
const server = http.createServer(app);

// Start server
server.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    // logger.info(`API Docs: http://localhost:${PORT}/api-docs`)
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
});
