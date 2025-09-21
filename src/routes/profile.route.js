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
router.put(
    "/",
    authMiddleware,
    upload.fields([{ name: "avatar", maxCount: 1 }, { name: "resume", maxCount: 1 }]),
    (req, res, next) => {
        // If no body fields but files exist → skip Joi validation
        if (Object.keys(req.body).length === 0 && req.files && Object.keys(req.files).length > 0) {
            return next();
        }
        return validateRequest(updateProfileSchema)(req, res, next);
    },
    profileController.updateProfile
);


module.exports = router;
