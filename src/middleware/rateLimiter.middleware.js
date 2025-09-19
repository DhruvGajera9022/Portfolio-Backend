const rateLimit = require("express-rate-limit");

/**
 * Express Rate Limiter Middleware
 * Limits the number of requests per IP to prevent abuse.
 *
 * @param {Object} [options] - Custom configuration options
 * @param {number} [options.windowMs] - Time window in milliseconds
 * @param {number} [options.max] - Maximum number of requests per window per IP
 * @param {string} [options.message] - Response message when limit is exceeded
 * @returns {import('express').RequestHandler} Express middleware
 */
const createRateLimiter = (options = {}) => {
    return rateLimit({
        windowMs: options.windowMs || (15 * 60 * 1000), // Default 15 minutes
        max: options.max || 100, // Default 100 requests per window per IP
        message: options.message || "Too many requests from this IP, please try again later",
        standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
        legacyHeaders: false, // Disable `X-RateLimit-*` headers
    });
};

// Default limiter instance
const limiter = createRateLimiter();

module.exports = {
    limiter,
    createRateLimiter,
};
