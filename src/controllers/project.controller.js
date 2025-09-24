const Project = require("../models/Project.model");
const logger = require("../utils/logger.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");
const mongoose = require("mongoose");
const { uploadFile, deleteFile } = require("../utils/cloudinaryService.util");

/**
 * Get all projects
 */
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await Project.find().sort({ priority: -1, createdAt: -1 });
        logger.info(`[GET ALL PROJECTS] Retrieved ${projects.length} projects`);

        return successResponse(res, {
            message: MESSAGES.PROJECTS_FETCH_SUCCESS,
            data: projects,
        });
    } catch (err) {
        logger.error(`[GET ALL PROJECTS] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Get project by ID
 */
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[GET PROJECT] Invalid ID: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MESSAGES.INVALID_ID,
            });
        }

        const project = await Project.findById(id);
        if (!project) {
            logger.warn(`[GET PROJECT] Project not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.PROJECT_NOT_FOUND,
            });
        }

        return successResponse(res, {
            message: MESSAGES.PROJECT_FETCH_SUCCESS,
            data: project,
        });
    } catch (err) {
        logger.error(`[GET PROJECT] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Create a new project
 */
exports.createProject = async (req, res) => {
    try {
        const value = req.body;

        const existingProject = await Project.findOne({ title: value.title });
        if (existingProject) {
            logger.warn(`[CREATE PROJECT] Duplicate project: ${value.title}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.CONFLICT,
                message: MESSAGES.PROJECT_DUPLICATE,
            });
        }

        // Handle image uploads (multiple images)
        if (req.files?.images?.length > 0) {
            value.images = [];
            for (const file of req.files.images) {
                const uploaded = await uploadFile(file.path, "project-images");
                value.images.push({
                    url: uploaded.url,
                    publicId: uploaded.publicId,
                    caption: file.originalname,
                });
            }
        }

        const project = await Project.create(value);
        logger.info(`[CREATE PROJECT] Project created: ${project._id}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: MESSAGES.PROJECT_CREATE_SUCCESS,
            data: project,
        });
    } catch (err) {
        logger.error(`[CREATE PROJECT] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Update a project
 */
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[UPDATE PROJECT] Invalid ID: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MESSAGES.INVALID_ID,
            });
        }

        const value = req.body;

        // Fetch existing project
        const project = await Project.findById(id);
        if (!project) {
            logger.warn(`[UPDATE PROJECT] Project not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.PROJECT_NOT_FOUND,
            });
        }

        // Handle image replacement
        if (req.files?.images?.length > 0) {
            // Delete old images
            if (project.images?.length > 0) {
                for (const img of project.images) {
                    if (img.publicId) await deleteFile(img.publicId);
                }
            }

            value.images = [];
            for (const file of req.files.images) {
                const uploaded = await uploadFile(file.path, "project-images");
                value.images.push({
                    url: uploaded.url,
                    publicId: uploaded.publicId,
                    caption: file.originalname,
                });
            }
        }

        const updatedProject = await Project.findByIdAndUpdate(id, value, {
            new: true,
            runValidators: true,
        });

        logger.info(`[UPDATE PROJECT] Project updated: ${id}`);
        return successResponse(res, {
            message: MESSAGES.PROJECT_UPDATE_SUCCESS,
            data: updatedProject,
        });
    } catch (err) {
        logger.error(`[UPDATE PROJECT] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Delete a project
 */
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[DELETE PROJECT] Invalid ID: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.BAD_REQUEST,
                message: MESSAGES.INVALID_ID,
            });
        }

        const deletedProject = await Project.findByIdAndDelete(id);
        if (!deletedProject) {
            logger.warn(`[DELETE PROJECT] Project not found: ${id}`);
            return errorResponse(res, {
                statusCode: HTTP_STATUS.NOT_FOUND,
                message: MESSAGES.PROJECT_NOT_FOUND,
            });
        }

        // Delete all images from Cloudinary
        if (deletedProject.images?.length > 0) {
            for (const img of deletedProject.images) {
                if (img.publicId) await deleteFile(img.publicId);
            }
        }

        logger.info(`[DELETE PROJECT] Project deleted: ${id}`);
        return successResponse(res, {
            message: MESSAGES.PROJECT_DELETE_SUCCESS,
        });
    } catch (err) {
        logger.error(`[DELETE PROJECT] Error: ${err.stack}`);
        return errorResponse(res, { statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR, message: MESSAGES.SERVER_ERROR });
    }
};
