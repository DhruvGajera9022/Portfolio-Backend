const Joi = require("joi");

const updateProfileSchema = Joi.object({
    firstName: Joi.string().max(50).trim(),
    lastName: Joi.string().max(50).trim(),
    phone: Joi.string().pattern(/^[\+]?[1-9][\d]{0,15}$/),
    location: Joi.object({
        city: Joi.string().trim(),
        state: Joi.string().trim(),
        country: Joi.string().trim(),
        coordinates: Joi.object({
            latitude: Joi.number(),
            longitude: Joi.number(),
        }),
    }),
    title: Joi.string().max(100).trim(),
    bio: Joi.string().max(1000).trim(),
    socialLinks: Joi.object({
        website: Joi.string().uri(),
        linkedin: Joi.string().uri(),
        github: Joi.string().uri(),
        twitter: Joi.string().uri(),
        instagram: Joi.string().uri(),
    }),
    // dummy placeholders for uploads
    avatar: Joi.any(),
    resume: Joi.any(),
})
    .min(1)
    .options({ stripUnknown: true }) // 🚀 removes _id, email, role, etc.
    .messages({
        "object.min": "At least one field must be provided for update",
    });


module.exports = { updateProfileSchema };
