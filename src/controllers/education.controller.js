const Education = require("../models/Education.model");
const logger = require("../utils/logger.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");
const mongoose = require("mongoose");

/**
 * Get all education entries
 */
exports.getAllEducations = async (req, res) => {
    try {
        const educations = await Education.find().sort({ startDate: -1, createdAt: -1 });
        logger.info(`[GET ALL EDUCATIONS] Retrieved ${educations.length} entries`);

        return successResponse(res, {
            message: MESSAGES.EDUCATIONS_FETCH_SUCCESS,
            data: educations,
        });
    } catch (err) {
        logger.error(`[GET ALL EDUCATIONS] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Get education by ID
 */
exports.getEducationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[GET EDUCATION] Invalid ID: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MESSAGES.INVALID_ID,
            });
        }

        const education = await Education.findById(id);
        if (!education) {
            logger.warn(`[GET EDUCATION] Not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.EDUCATION_NOT_FOUND,
            });
        }

        return successResponse(res, {
            message: MESSAGES.EDUCATION_FETCH_SUCCESS,
            data: education,
        });
    } catch (err) {
        logger.error(`[GET EDUCATION] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Create a new education entry
 */
exports.createEducation = async (req, res) => {
    try {
        const value = req.body;

        const existing = await Education.findOne({
            institution: value.institution,
            degree: value.degree,
            fieldOfStudy: value.fieldOfStudy,
            startDate: value.startDate,
        });
        if (existing) {
            logger.warn(`[CREATE EDUCATION] Duplicate entry for: ${value.institution}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.CONFLICT,
                message: MESSAGES.EDUCATION_DUPLICATE,
            });
        }

        const education = await Education.create(value);
        logger.info(`[CREATE EDUCATION] Created entry: ${education._id}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: MESSAGES.EDUCATION_CREATE_SUCCESS,
            data: education,
        });
    } catch (err) {
        logger.error(`[CREATE EDUCATION] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Update an education entry
 */
exports.updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[UPDATE EDUCATION] Invalid ID: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MESSAGES.INVALID_ID,
            });
        }

        const value = req.body;

        const education = await Education.findById(id);
        if (!education) {
            logger.warn(`[UPDATE EDUCATION] Not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.EDUCATION_NOT_FOUND,
            });
        }

        const updatedEducation = await Education.findByIdAndUpdate(id, value, {
            new: true,
            runValidators: true,
        });

        logger.info(`[UPDATE EDUCATION] Updated entry: ${id}`);
        return successResponse(res, {
            message: MESSAGES.EDUCATION_UPDATE_SUCCESS,
            data: updatedEducation,
        });
    } catch (err) {
        logger.error(`[UPDATE EDUCATION] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Delete an education entry
 */
exports.deleteEducation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[DELETE EDUCATION] Invalid ID: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MESSAGES.INVALID_ID,
            });
        }

        const deleted = await Education.findByIdAndDelete(id);
        if (!deleted) {
            logger.warn(`[DELETE EDUCATION] Not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.EDUCATION_NOT_FOUND,
            });
        }

        logger.info(`[DELETE EDUCATION] Deleted entry: ${id}`);
        return successResponse(res, {
            message: MESSAGES.EDUCATION_DELETE_SUCCESS,
        });
    } catch (err) {
        logger.error(`[DELETE EDUCATION] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};
