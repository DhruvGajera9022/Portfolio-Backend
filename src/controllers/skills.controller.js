const Skill = require("../models/skill.model");
const logger = require("../utils/logger.util");
const { successResponse, errorResponse } = require("../utils/response.util");
const { HTTP_STATUS, MESSAGES } = require("../../shared/constants");
const mongoose = require("mongoose");

/**
 * Get all skills
 */
exports.getAllSkills = async (req, res) => {
    try {
        const skills = await Skill.find().sort({ displayOrder: 1, name: 1 });
        logger.info(`[GET ALL SKILLS] Retrieved ${skills.length} skills`);

        return successResponse(res, {
            message: MESSAGES.SKILLS_FETCH_SUCCESS,
            data: skills,
        });
    } catch (err) {
        logger.error(`[GET ALL SKILLS] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Get skill by ID
 */
exports.getSkillById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[GET SKILL] Invalid ID: ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.BAD_REQUEST, message: MESSAGES.INVALID_ID });
        }

        const skill = await Skill.findById(id);
        if (!skill) {
            logger.warn(`[GET SKILL] Skill not found: ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.NOT_FOUND, message: MESSAGES.NOT_FOUND });
        }

        return successResponse(res, {
            message: MESSAGES.SKILL_CREATE_SUCCESS,
            data: skill,
        });
    } catch (err) {
        logger.error(`[GET SKILL] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Create a new skill
 */
exports.createSkill = async (req, res) => {
    try {
        const value = req.body;

        const existingSkill = await Skill.findOne({ name: value.name });
        if (existingSkill) {
            logger.warn(`[CREATE SKILL] Duplicate skill: ${value.name}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.CONFLICT, message: MESSAGES.DUPLICATE_ENTRY });
        }

        const skill = await Skill.create(value);
        logger.info(`[CREATE SKILL] Skill created: ${skill._id}`);

        return successResponse(res, {
            statusCode: HTTP_STATUS.CREATED,
            message: MESSAGES.SKILL_CREATE_SUCCESS,
            data: skill,
        });
    } catch (err) {
        logger.error(`[CREATE SKILL] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Update a skill
 */
exports.updateSkill = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[UPDATE SKILL] Invalid ID: ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.BAD_REQUEST, message: MESSAGES.INVALID_ID });
        }

        const value = req.body;

        const updatedSkill = await Skill.findByIdAndUpdate(id, value, { new: true });
        if (!updatedSkill) {
            logger.warn(`[UPDATE SKILL] Skill not found: ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.NOT_FOUND, message: MESSAGES.NOT_FOUND });
        }

        logger.info(`[UPDATE SKILL] Skill updated: ${id}`);
        return successResponse(res, { message: MESSAGES.SKILL_UPDATE_SUCCESS, data: updatedSkill });
    } catch (err) {
        logger.error(`[UPDATE SKILL] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};

/**
 * Delete a skill
 */
exports.deleteSkill = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            logger.warn(`[DELETE SKILL] Invalid ID: ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.BAD_REQUEST, message: MESSAGES.INVALID_ID });
        }

        const deletedSkill = await Skill.findByIdAndDelete(id);
        if (!deletedSkill) {
            logger.warn(`[DELETE SKILL] Skill not found: ${id}`);
            return errorResponse(res, { statusCode: HTTP_STATUS.NOT_FOUND, message: MESSAGES.NOT_FOUND });
        }

        logger.info(`[DELETE SKILL] Skill deleted: ${id}`);
        return successResponse(res, { message: MESSAGES.SKILL_DELETE_SUCCESS });
    } catch (err) {
        logger.error(`[DELETE SKILL] Error: ${err.stack}`);
        return errorResponse(res, { message: MESSAGES.SERVER_ERROR });
    }
};
