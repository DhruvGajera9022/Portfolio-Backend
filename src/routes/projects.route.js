const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validation.middleware");
const projectController = require("../controllers/project.controller");
const { createProjectSchema, updateProjectSchema } = require("../validations/project.validation");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../config/multer.config");

/**
 * @route   GET /api/project
 * @desc    Get all project
 * @access  Public
 */
router.get("/", projectController.getAllProjects);

/**
 * @route   GET /api/project/:id
 * @desc    Get project by ID
 * @access  Public
 */
router.get("/:id", projectController.getProjectById);

/**
 * @route   POST /api/project
 * @desc    Create a new project
 * @access  Admin
 */
router.post(
    "/",
    upload.fields([{ name: "images", maxCount: 10 }]),
    authMiddleware,
    validateRequest(createProjectSchema),
    projectController.createProject
);

/**
 * @route   PUT /api/project/:id
 * @desc    Update an project
 * @access  Admin
 */
router.put(
    "/:id",
    upload.fields([{ name: "images", maxCount: 10 }]),
    authMiddleware,
    validateRequest(updateProjectSchema),
    projectController.updateProject
);

/**
 * @route   DELETE /api/project/:id
 * @desc    Delete an project
 * @access  Admin
 */
router.delete(
    "/:id",
    authMiddleware,
    projectController.deleteProject
);

module.exports = router;
