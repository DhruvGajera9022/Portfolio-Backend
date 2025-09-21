const Joi = require("joi");

const updateProfileSchema = Joi.object({
    firstName: Joi.string().max(50).trim().messages({
        "string.max": "First name cannot exceed 50 characters",
    }),
    lastName: Joi.string().max(50).trim().messages({
        "string.max": "Last name cannot exceed 50 characters",
    }),
    avatar: Joi.object({
        url: Joi.string().uri().messages({
            "string.uri": "Avatar URL must be a valid URI",
        }),
        publicId: Joi.string(),
    }),
    phone: Joi.string()
        .pattern(/^[\+]?[1-9][\d]{0,15}$/)
        .messages({
            "string.pattern.base": "Please enter a valid phone number",
        }),
    location: Joi.object({
        city: Joi.string().trim(),
        state: Joi.string().trim(),
        country: Joi.string().trim(),
        coordinates: Joi.object({
            latitude: Joi.number(),
            longitude: Joi.number(),
        }),
    }),
    title: Joi.string().max(100).trim().messages({
        "string.max": "Title cannot exceed 100 characters",
    }),
    bio: Joi.string().max(1000).trim().messages({
        "string.max": "Bio cannot exceed 1000 characters",
    }),
    resume: Joi.object({
        url: Joi.string().uri().messages({
            "string.uri": "Resume URL must be a valid URI",
        }),
        publicId: Joi.string(),
        fileName: Joi.string(),
        uploadedAt: Joi.date(),
    }),
    socialLinks: Joi.object({
        website: Joi.string().uri().messages({
            "string.uri": "Website must be a valid URL",
        }),
        linkedin: Joi.string().uri().messages({
            "string.uri": "LinkedIn must be a valid URL",
        }),
        github: Joi.string().uri().messages({
            "string.uri": "GitHub must be a valid URL",
        }),
        twitter: Joi.string().uri().messages({
            "string.uri": "Twitter must be a valid URL",
        }),
        instagram: Joi.string().uri().messages({
            "string.uri": "Instagram must be a valid URL",
        }),
    }),

    // Dummy fields to allow file uploads without breaking
    avatar: Joi.any(),
    resume: Joi.any(),
}).min(1).messages({
    "object.min": "At least one field must be provided for update",
});

module.exports = { updateProfileSchema };
