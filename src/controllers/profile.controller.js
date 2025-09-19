const User = require("../models/User.model");
const logger = require("../utils/logger.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");

/**
 * Get Profile data
 */
exports.me = async (req, res) => {
    const userId = req.user?.id;

    try {
        logger.info(`[ME] Fetching profile for userId: ${userId}`);

        const userData = await User.findById(userId).select("-password -__v"); // exclude sensitive fields

        if (!userData) {
            logger.warn(`[ME] User not found. userId: ${userId}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.USER_NOT_FOUND,
            });
        }

        logger.info(`[ME] Profile fetched successfully. userId: ${userId}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: MESSAGES.USER_PROFILE_FETCHED,
            data: userData,
        });
    } catch (error) {
        logger.error(`[ME] Error fetching profile for userId: ${userId}, stack: ${error.stack}`);
        return errorResponse(res, {
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MESSAGES.SERVER_ERROR,
        });
    }
};
