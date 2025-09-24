const Experience = require("../models/Experience.model");
const { experienceSchema } = require("../validations/experience.validation");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");
const { successResponse, errorResponse } = require("../utils/response.util");
const logger = require("../utils/logger.util");
const { uploadFile, deleteFile } = require("../utils/cloudinaryService.util");


/**
 * Create a new experience
 */
exports.createExperience = async (req, res) => {
    try {
        logger.info(`[CREATE EXPERIENCE] Request body: ${JSON.stringify(req.body)}`);

        // Validate request body
        const { error, value } = experienceSchema.validate(req.body, { abortEarly: false });
        if (error) {
            logger.warn(`[CREATE EXPERIENCE] Validation failed: ${JSON.stringify(error.details)}`);
            return errorResponse(
                res,
                {
                    statusCode: HTTP_STATUS.BAD_REQUEST,
                    message: error.details.map(d => d.message)
                }
            );
        }

        // Check for duplicate experience (based on jobTitle + company + startDate)
        const existingExperience = await Experience.findOne({
            jobTitle: value.jobTitle,
            company: value.company,
            startDate: value.startDate,
        });

        if (existingExperience) {
            logger.warn(`[CREATE EXPERIENCE] Duplicate experience detected`);
            return errorResponse(
                res,
                {
                    statusCode: HTTP_STATUS.CONFLICT,
                    message: MESSAGES.EXPERIENCE_DUPLICATE
                }
            );
        }

        // Handle image uploads (images array)
        if (req.files?.images?.length > 0) {
            value.images = [];
            for (const file of req.files.images) {
                const uploaded = await uploadFile(file.path, "uploads/experience-images");
                value.images.push({
                    url: uploaded.url,
                    publicId: uploaded.publicId,
                    caption: file.originalname,
                });
            }
        }

        const experience = await Experience.create(value);
        logger.info(`[CREATE EXPERIENCE] Experience created with ID: ${experience._id}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: MESSAGES.EXPERIENCE_CREATED_SUCCESS,
            data: experience,
        });
    } catch (err) {
        logger.error(`[CREATE EXPERIENCE] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: err.message });
    }
};


/**
 * Get all experiences
 */
exports.getExperiences = async (req, res) => {
    try {
        logger.info(`[GET EXPERIENCES] Fetching all experiences`);
        const experiences = await Experience.find().sort({ displayOrder: 1, startDate: -1 });

        logger.info(`[GET EXPERIENCES] ${experiences.length} experiences fetched`);
        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: MESSAGES.EXPERIENCES_FETCHED_SUCCESS,
            data: experiences,
        });
    } catch (err) {
        logger.error(`[GET EXPERIENCES] Error: ${err.message}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: err.message });
    }
};

/**
 * Get single experience by ID
 */
exports.getExperienceById = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info(`[GET EXPERIENCE] Fetching experience with ID: ${id}`);

        const experience = await Experience.findById(id);
        if (!experience) {
            logger.warn(`[GET EXPERIENCE] ${MESSAGES.EXPERIENCE_NOT_FOUND}: ID ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.NOT_FOUND, message: MESSAGES.EXPERIENCE_NOT_FOUND });
        }

        logger.info(`[GET EXPERIENCE] Experience fetched: ID ${id}`);
        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: MESSAGES.EXPERIENCE_FETCH_SUCCESS,
            data: experience,
        });
    } catch (err) {
        logger.error(`[GET EXPERIENCE] Error: ${err.message}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: err.message });
    }
};

/**
 * Update an experience
 */
exports.updateExperience = async (req, res) => {
    try {
        const { id } = req.params;

        logger.info(`[UPDATE EXPERIENCE] Updating experience ID: ${id}, Data: ${JSON.stringify(req.body || {})}`);

        const bodyData = req.body || {};
        const { error, value } = experienceSchema.validate(bodyData, { abortEarly: false });
        if (error) {
            logger.warn(`[UPDATE EXPERIENCE] Validation failed: ${JSON.stringify(error.details)}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.BAD_REQUEST, message: error.details.map(d => d.message) });
        }

        // Fetch existing experience
        const experience = await Experience.findById(id);
        if (!experience) {
            logger.warn(`[UPDATE EXPERIENCE] ${MESSAGES.EXPERIENCE_NOT_FOUND}: ID ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.NOT_FOUND, message: MESSAGES.EXPERIENCE_NOT_FOUND });
        }

        // Handle company logo upload
        if (req.files?.companyLogo?.length > 0) {
            // Delete old logo if exists
            if (experience.companyLogo?.publicId) {
                await deleteFile(experience.companyLogo.publicId);
            }

            const file = req.files.companyLogo[0];
            const uploaded = await uploadFile(file.path, "company-logos");
            value.companyLogo = { url: uploaded.url, publicId: uploaded.publicId };
        }

        // Handle experience images upload
        if (req.files?.images?.length > 0) {
            // Delete old images if exist
            if (experience.images?.length > 0) {
                for (const img of experience.images) {
                    if (img.publicId) await deleteFile(img.publicId);
                }
            }

            value.images = [];
            for (const file of req.files.images) {
                const uploaded = await uploadFile(file.path, "experience-images");
                value.images.push({
                    url: uploaded.url,
                    publicId: uploaded.publicId,
                    caption: file.originalname,
                });
            }
        }

        // Update experience
        const updatedExperience = await Experience.findByIdAndUpdate(id, value, { new: true, runValidators: true });

        logger.info(`[UPDATE EXPERIENCE] Experience updated: ID ${id}`);
        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: MESSAGES.EXPERIENCE_UPDATE_SUCCESS,
            data: updatedExperience,
        });

    } catch (err) {
        logger.error(`[UPDATE EXPERIENCE] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: err.message });
    }
};


/**
 * Delete an experience
 */
exports.deleteExperience = async (req, res) => {
    try {
        const { id } = req.params;
        logger.info(`[DELETE EXPERIENCE] Deleting experience ID: ${id}`);

        const experience = await Experience.findByIdAndDelete(id);
        if (!experience) {
            logger.warn(`[DELETE EXPERIENCE] ${MESSAGES.EXPERIENCE_NOT_FOUND}: ID ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.NOT_FOUND, message: MESSAGES.EXPERIENCE_NOT_FOUND });
        }

        await deleteFile(experience.companyLogo?.publicId);
        for (const img of experience.images || []) {
            await deleteFile(img.publicId);
        }

        logger.info(`[DELETE EXPERIENCE] Experience deleted: ID ${id}`);
        return successResponse(res, {
            statusCode: HTTP_STATUS.OK,
            message: MESSAGES.EXPERIENCE_DELETE_SUCCESS,
        });
    } catch (err) {
        logger.error(`[DELETE EXPERIENCE] Error: ${err.message}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: err.message });
    }
};
