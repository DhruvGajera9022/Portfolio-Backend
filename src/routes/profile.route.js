// routes/profile.routes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const profileController = require("../controllers/profile.controller");
const validateRequest = require("../middleware/validation.middleware");
const {
    updateProfileSchema,
} = require("../validations/profile.validation");
const upload = require("../config/multer.config");

/**
 * @route   GET /api/profile/me
 * @desc    Get Profile data
 * @access  Private
 */
router.get("/", authMiddleware, profileController.me);

/**
 * @route   PUT /api/profile
 * @desc    Update Profile data
 * @access  Private
 */
router.put("/", authMiddleware, upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "resume", maxCount: 1 },
]), validateRequest(updateProfileSchema), profileController.updateProfile);

module.exports = router;
