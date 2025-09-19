require("dotenv").config();
const mongoose = require("mongoose");
const logger = require("../utils/logger.util");

/**
 * Connects to MongoDB using MONGO_URI from environment variables.
 * Logs success or failure using Winston logger.
 *
 * @async
 * @function connectDB
 * @throws Will exit the process with code 1 if connection fails.
 * @example
 * const connectDB = require('./config/database');
 * connectDB();
 */

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
