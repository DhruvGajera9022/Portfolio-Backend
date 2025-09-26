const User = require("../models/User.model");
const logger = require("../utils/logger.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");
const { uploadFile, deleteFile } = require("../utils/cloudinaryService.util");

/**
 * Get Profile data
 */
exports.me = async (req, res) => {

    try {

        const userData = await User.find().select("-password -__v"); // exclude sensitive fields

        if (!userData) {
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.USER_NOT_FOUND,
            });
        }

        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: MESSAGES.USER_PROFILE_FETCHED,
            data: userData,
        });
    } catch (error) {
        logger.error(`[ME] Error fetching profile for stack: ${error.stack}`);
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

        const allowedFields = [
            "firstName",
            "lastName",
            "phone",
            "location",
            "title",
            "bio",
            "socialLinks",
        ];

        if (!req.body) {
            logger.error(`[UPDATE PROFILE] req.body is undefined.`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: "Invalid request body",
            });
        }

        const updates = {};

        // Copy allowed fields from req.body
        for (const field of allowedFields) {
            if (req.body[field] !== undefined) updates[field] = req.body[field];
        }

        // Fetch existing user to check for old files
        const existingUser = await User.findById(userId);
        if (!existingUser) {
            logger.warn(`[UPDATE PROFILE] User not found. userId: ${userId}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.USER_NOT_FOUND,
            });
        }

        // Handle avatar upload
        if (req.files?.avatar?.length > 0) {
            // Delete old avatar from Cloudinary
            if (existingUser.avatar?.publicId) await deleteFile(existingUser.avatar.publicId);

            const uploadedAvatar = await uploadFile(req.files.avatar[0].path, "avatars");
            updates.avatar = uploadedAvatar;
        }

        // Handle resume upload
        if (req.files?.resume?.length > 0) {
            // Delete old resume from Cloudinary
            if (existingUser.resume?.publicId) await deleteFile(existingUser.resume.publicId);

            const uploadedResume = await uploadFile(req.files.resume[0].path, "resumes");
            updates.resume = {
                ...uploadedResume,
                fileName: req.files.resume[0].originalname,
                uploadedAt: new Date(),
            };
        }

        if (Object.keys(updates).length === 0) {
            logger.warn(`[UPDATE PROFILE] No valid fields provided. userId: ${userId}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: "No valid fields to update",
            });
        }

        // Update user
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true,
            select: "-password -__v",
        });

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
};
