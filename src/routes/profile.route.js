const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const profileController = require("../controllers/profile.controller");

/**
 * @route   POST /api/profile/me
 * @desc    Get Profile data
 * @access  Private
 */
router.get(
    "/me",
    authMiddleware,
    profileController.me
);

module.exports = router;
