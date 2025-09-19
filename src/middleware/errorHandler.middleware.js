const logger = require("../utils/logger.util");
const { MESSAGES, HTTP_STATUS } = require("../../shared/constants")

/**
 * Global error-handling middleware for Express
 *
 * @param {Error} err - The error object
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const errorHandler = (err, req, res, next) => {
    // Log error using Winston
    logger.error(err);

    // Customize status code if present, otherwise 500
    const statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;

    res.status(statusCode).json({
        success: false,
        message: err.message || MESSAGES.SERVER_ERROR,
        // Include stack trace only in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

module.exports = errorHandler;
