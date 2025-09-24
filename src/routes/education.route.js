const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validation.middleware");
const educationController = require("../controllers/education.controller");
const {
    createEducationSchema,
    updateEducationSchema,
} = require("../validations/education.validation");
const authMiddleware = require("../middleware/auth.middleware"); // Auth protection

/**
 * @route   GET /api/education
 * @desc    Get all education entries
 * @access  Public
 */
router.get("/", educationController.getAllEducations);

/**
 * @route   GET /api/education/:id
 * @desc    Get education entry by ID
 * @access  Public
 */
router.get("/:id", educationController.getEducationById);

/**
 * @route   POST /api/education
 * @desc    Create a new education entry
 * @access  Public
 */
router.post(
    "/",
    authMiddleware,
    validateRequest(createEducationSchema),
    educationController.createEducation
);

/**
 * @route   PUT /api/education/:id
 * @desc    Update an existing education entry
 * @access  Public
 */
router.put(
    "/:id",
    authMiddleware,
    validateRequest(updateEducationSchema),
    educationController.updateEducation
);

/**
 * @route   DELETE /api/education/:id
 * @desc    Delete an education entry
 * @access  Public
 */
router.delete("/:id", authMiddleware, educationController.deleteEducation);

module.exports = router;
