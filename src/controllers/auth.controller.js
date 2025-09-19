const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User.model");
const { generateToken } = require("../config/jwt.config");
const logger = require("../utils/logger.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");
const { sendResetEmail } = require("../utils/emailService.util");

/**
 * Register a new user
 */
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        logger.info(`[REGISTER] Request body: ${JSON.stringify({ firstName, lastName, email, role })}`);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn(`[REGISTER] Attempt with existing email: ${email}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.CONFLICT,
                message: MESSAGES.DUPLICATE_ENTRY,
            });
        }

        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT, 10));

        const user = await User.create({ firstName, lastName, email, password: hashedPassword, role });
        logger.info(`[REGISTER] User created: ${user._id}`);

        const token = generateToken({ id: user._id, email: user.email });
        logger.info(`[REGISTER] JWT generated for user: ${user._id}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: MESSAGES.REGISTER_SUCCESS,
            data: {
                user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
                token,
            },
        });
    } catch (err) {
        logger.error(`[REGISTER] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info(`[LOGIN] Attempt with email: ${email}`);

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            logger.warn(`[LOGIN] Invalid email: ${email}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.UNAUTHORIZED, message: MESSAGES.INVALID_CREDENTIALS });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            logger.warn(`[LOGIN] Invalid password attempt for user: ${user._id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.UNAUTHORIZED, message: MESSAGES.INVALID_CREDENTIALS });
        }

        const token = generateToken({ id: user._id, email: user.email });
        logger.info(`[LOGIN] User logged in: ${user._id}`);

        return successResponse(res, {
            message: MESSAGES.LOGIN_SUCCESS,
            data: {
                user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
                token,
            },
        });
    } catch (err) {
        logger.error(`[LOGIN] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Reset Password (Private - No token required)
 */
exports.resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info(`[RESET PASSWORD] Request for email: ${email}`);

        const user = await User.findOne({ email });
        if (!user) {
            logger.warn(`[RESET PASSWORD] User not found: ${email}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.USER_NOT_FOUND,
            });
        }

        user.password = await bcrypt.hash(password, parseInt(process.env.SALT, 10));
        await user.save();

        logger.info(`[RESET PASSWORD] Password updated successfully for: ${user._id}`);

        return successResponse(res, {
            message: MESSAGES.PASSWORD_RESET_SUCCESS,
        });
    } catch (err) {
        logger.error(`[RESET PASSWORD] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};
