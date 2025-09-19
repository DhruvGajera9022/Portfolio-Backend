const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, colorize, errors } = format;
const path = require("path");

/**
 * Custom log format for Winston logger
 * Includes timestamp, log level, and message or stack trace.
 * @param {Object} param0
 * @param {string} param0.level - Log level (info, error, etc.)
 * @param {string} param0.message - Log message
 * @param {string} param0.timestamp - Timestamp of log
 * @param {string} [param0.stack] - Stack trace if available
 * @returns {string} Formatted log string
 */
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});


/**
 * Winston logger configuration
 * Logs to console and files (error.log and combined.log)
 * Supports stack traces for errors.
 *
 * @type {import('winston').Logger}
 */
const logger = createLogger({
    level: "info",
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        // Console with colors
        new transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                errors({ stack: true }),
                logFormat
            ),
        }),
        // File transport without colors
        new transports.File({
            filename: path.join(__dirname, "../../logs/combined.log"),
        }),
        new transports.File({
            filename: path.join(__dirname, "../../logs/error.log"),
            level: "error",
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
