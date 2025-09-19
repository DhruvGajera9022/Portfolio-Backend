const Joi = require("joi");

/**
 * Registration validation schema
 */
const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
        "string.empty": "firstName is required",
        "string.min": "firstName must be at least 2 characters",
        "string.max": "firstName cannot exceed 50 characters",
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        "string.empty": "lastName is required",
        "string.min": "lastName must be at least 2 characters",
        "string.max": "lastName cannot exceed 50 characters",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),
    role: Joi.string().valid("user", "admin", "guest").optional(),
});

/**
 * Login validation schema
 */
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email",
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
    }),
});

/**
 * Reset password validation schema
 */
const resetPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Please provide a valid email",
    }),
    password: Joi.string().min(6).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 6 characters",
    }),
});

module.exports = {
    registerSchema,
    loginSchema,
    resetPasswordSchema,
};
