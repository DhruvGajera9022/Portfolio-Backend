const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validation.middleware");
const skillsController = require("../controllers/skills.controller");
const skillSchema = require("../validations/skills.validation");
const authMiddleware = require("../middleware/auth.middleware"); // Auth protection

/**
 * @route   GET /api/skills
 * @desc    Get all skills
 * @access  Public
 */
router.get("/", skillsController.getAllSkills);

/**
 * @route   GET /api/skills/:id
 * @desc    Get skill by ID
 * @access  Public
 */
router.get("/:id", skillsController.getSkillById);

/**
 * @route   POST /api/skills
 * @desc    Create a new skill
 * @access  Admin
 */
router.post(
    "/",
    authMiddleware,
    validateRequest(skillSchema),
    skillsController.createSkill
);

/**
 * @route   PUT /api/skills/:id
 * @desc    Update a skill
 * @access  Admin
 */
router.put(
    "/:id",
    authMiddleware,
    validateRequest(skillSchema),
    skillsController.updateSkill
);

/**
 * @route   DELETE /api/skills/:id
 * @desc    Delete a skill
 * @access  Admin
 */
router.delete(
    "/:id",
    authMiddleware,
    skillsController.deleteSkill
);

module.exports = router;
