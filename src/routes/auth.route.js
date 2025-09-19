const express = require("express");
const router = express.Router();
const validateRequest = require("../middleware/validation.middleware");
const authController = require("../controllers/auth.controller");
const {
    registerSchema,
    loginSchema,
    resetPasswordSchema,
} = require("../validations/auth.validation");

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
    "/register",
    validateRequest(registerSchema),
    authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
    "/login",
    validateRequest(loginSchema),
    authController.login
);

/**
 * @route   POST /api/auth/reset-password
 * @desc    Reset user password
 * @access  Public
 */
router.post(
    "/reset-password",
    validateRequest(resetPasswordSchema),
    authController.resetPassword
);

module.exports = router;
