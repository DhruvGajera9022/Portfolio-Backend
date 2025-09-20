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


/**
 * Update Profile
 */
exports.updateProfile = async (req, res) => {
    const userId = req.user?.id;

    try {
        logger.info(`[UPDATE PROFILE] Attempting update for userId: ${userId}`);

        // Define allowed fields for profile update
        const allowedFields = [
            "firstName",
            "lastName",
            "avatar",
            "phone",
            "location",
            "title",
            "bio",
            "resume",
            "socialLinks",
        ];

        // Filter request body to include only allowed fields
        const updates = {};
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        }

        if (Object.keys(updates).length === 0) {
            logger.warn(`[UPDATE PROFILE] No valid fields provided. userId: ${userId}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: "No valid fields to update",
            });
        }

        // Perform update
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true, // return updated doc
            runValidators: true, // apply schema validations
            select: "-password -__v", // exclude sensitive fields
        });

        if (!updatedUser) {
            logger.warn(`[UPDATE PROFILE] User not found. userId: ${userId}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.USER_NOT_FOUND,
            });
        }

        logger.info(`[UPDATE PROFILE] Profile updated successfully. userId: ${userId}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: MESSAGES.USER_PROFILE_UPDATED,
            data: updatedUser,
        });
    } catch (error) {
        logger.error(`[UPDATE PROFILE] Error updating profile for userId: ${userId}, stack: ${error.stack}`);
        return errorResponse(res, {
            statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MESSAGES.SERVER_ERROR,
        });
    }
}
