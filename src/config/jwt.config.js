const jwt = require("jsonwebtoken");
const logger = require("../utils/logger.util");

/**
 * JWT Configuration
 */
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Generate a JWT token
 *
 * @param {Object} payload - Payload to encode in the token
 * @param {string|number} [expiresIn] - Optional custom expiration
 * @returns {string} JWT token
 */
const generateToken = (payload, expiresIn = JWT_EXPIRES_IN) => {
    try {
        return jwt.sign(payload, JWT_SECRET, { expiresIn });
    } catch (err) {
        logger.error(`Error generating JWT: ${err.message}`);
        throw new Error("Token generation failed");
    }
};

/**
 * Verify a JWT token
 *
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded payload
 * @throws Will throw error if token is invalid or expired
 */
const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        logger.error(`JWT verification failed: ${err.message}`);
        throw new Error("Invalid or expired token");
    }
};

module.exports = {
    JWT_SECRET,
    JWT_EXPIRES_IN,
    generateToken,
    verifyToken,
};
