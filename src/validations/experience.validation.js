const Joi = require("joi");

/**
 * Experience validation schema
 */
const experienceSchema = Joi.object({
    jobTitle: Joi.string().max(100).required().messages({
        "string.empty": "Job title is required",
        "string.max": "Job title cannot exceed 100 characters",
    }),
    company: Joi.string().max(100).required().messages({
        "string.empty": "Company name is required",
        "string.max": "Company name cannot exceed 100 characters",
    }),
    companyUrl: Joi.string().uri().optional().messages({
        "string.uri": "Please provide a valid company URL",
    }),
    employmentType: Joi.string()
        .valid("Full-time", "Part-time", "Contract", "Freelance", "Internship")
        .required()
        .messages({
            "any.only": "Employment type must be one of Full-time, Part-time, Contract, Freelance, Internship",
            "string.empty": "Employment type is required",
        }),
    workMode: Joi.string()
        .valid("On-site", "Remote", "Hybrid")
        .optional()
        .default("On-site"),
    location: Joi.object({
        city: Joi.string().optional(),
        state: Joi.string().optional(),
        country: Joi.string().optional(),
    }).optional(),
    startDate: Joi.date().required().messages({
        "date.base": "Start date must be a valid date",
        "any.required": "Start date is required",
    }),
    endDate: Joi.date().optional().allow(null),
    isCurrent: Joi.boolean().optional().default(false),
    description: Joi.string().max(2000).required().messages({
        "string.empty": "Job description is required",
        "string.max": "Description cannot exceed 2000 characters",
    }),
    responsibilities: Joi.array().items(Joi.string()).optional(),
    achievements: Joi.array().items(Joi.string()).optional(),
    technologies: Joi.array().items(Joi.string()).optional(),
    projects: Joi.array().items(
        Joi.object({
            name: Joi.string().optional(),
            description: Joi.string().optional(),
            technologies: Joi.array().items(Joi.string()).optional(),
            url: Joi.string().uri().optional(),
        })
    ).optional(),
    images: Joi.array().items(
        Joi.object({
            url: Joi.string().optional(),
            publicId: Joi.string().optional(),
            caption: Joi.string().optional(),
        })
    ).optional(),
    featured: Joi.boolean().optional().default(false),
    displayOrder: Joi.number().optional().default(0),
});

module.exports = {
    experienceSchema,
};
