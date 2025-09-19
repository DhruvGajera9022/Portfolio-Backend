const bcrypt = require("bcryptjs");

const SALT_ROUNDS = parseInt(process.env.SALT, 10) || 10;

/**
 * Hashes a plain text password using bcrypt.
 *
 * @async
 * @function hashPassword
 * @param {string} password - The plain text password to hash.
 * @returns {Promise<string>} The hashed password.
 * @throws {Error} If hashing fails.
 */
async function hashPassword(password) {
    if (!password) {
        throw new Error("Password is required for hashing");
    }
    return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain text password with a hashed password.
 *
 * @async
 * @function comparePassword
 * @param {string} password - The plain text password to verify.
 * @param {string} hashedPassword - The previously hashed password to compare against.
 * @returns {Promise<boolean>} True if passwords match, false otherwise.
 * @throws {Error} If comparison fails.
 */
async function comparePassword(password, hashedPassword) {
    if (!password || !hashedPassword) {
        throw new Error("Both password and hashedPassword are required for comparison");
    }
    return bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword,
};
