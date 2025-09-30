const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validation.middleware");
const experienceController = require("../controllers/experience.controller");
const { experienceSchema } = require("../validations/experience.validation");

/**
 * @route   POST /api/experience
 * @desc    Create a new experience
 * @access  Public (or Private if you add auth middleware)
 */
router.post(
    "/",
    validateRequest(experienceSchema),
    experienceController.createExperience
);

/**
 * @route   GET /api/experience
 * @desc    Get all experiences
 * @access  Public
 */
router.get("/", experienceController.getExperiences);

/**
 * @route   GET /api/experience/:id
 * @desc    Get experience by ID
 * @access  Public
 */
router.get("/:id", experienceController.getExperienceById);

/**
 * @route   PUT /api/experience/:id
 * @desc    Update an experience
 * @access  Public (or Private if you add auth middleware)
 */
router.put(
    "/:id",
    validateRequest(experienceSchema),
    experienceController.updateExperience
);

/**
 * @route   DELETE /api/experience/:id
 * @desc    Delete an experience
 * @access  Public (or Private if you add auth middleware)
 */
router.delete("/:id", experienceController.deleteExperience);

module.exports = router;
