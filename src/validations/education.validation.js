const Joi = require("joi");

// Common education fields
const baseEducationSchema = {
    institution: Joi.string().max(200).trim().messages({
        "string.max": "Institution name cannot exceed 200 characters",
        "string.empty": "Institution name is required",
    }),
    degree: Joi.string().max(100).trim().messages({
        "string.max": "Degree cannot exceed 100 characters",
        "string.empty": "Degree is required",
    }),
    fieldOfStudy: Joi.string().max(100).trim().messages({
        "string.max": "Field of study cannot exceed 100 characters",
        "string.empty": "Field of study is required",
    }),
    startDate: Joi.date().messages({
        "date.base": "Start date must be a valid date",
        "any.required": "Start date is required",
    }),
    endDate: Joi.date().optional().allow(null).messages({
        "date.base": "End date must be a valid date",
    }),
    grade: Joi.string().max(20).trim().optional().allow("").messages({
        "string.max": "Grade cannot exceed 20 characters",
    }),
    description: Joi.string().max(1000).trim().optional().allow("").messages({
        "string.max": "Description cannot exceed 1000 characters",
    }),
    status: Joi.string().valid("completed", "in-progress").optional().default("completed").messages({
        "any.only": "Status must be either 'completed' or 'in-progress'",
    }),
    link: Joi.string().uri().optional().messages({
        "string.uri": "Link must be a valid URL",
    }),
    certificates: Joi.array().items(
        Joi.object({
            title: Joi.string().max(200).trim().required().messages({
                "string.empty": "Certificate title is required",
                "string.max": "Certificate title cannot exceed 200 characters",
            }),
            url: Joi.string().uri().optional().messages({
                "string.uri": "Certificate URL must be valid",
            }),
            issuedBy: Joi.string().max(200).optional().messages({
                "string.max": "Issuer name cannot exceed 200 characters",
            }),
            issueDate: Joi.date().optional().messages({
                "date.base": "Certificate issue date must be a valid date",
            }),
        })
    ),
};

// Schemas
const createEducationSchema = Joi.object({
    ...baseEducationSchema,
    institution: baseEducationSchema.institution.required(),
    degree: baseEducationSchema.degree.required(),
    fieldOfStudy: baseEducationSchema.fieldOfStudy.required(),
    startDate: baseEducationSchema.startDate.required(),
});

const updateEducationSchema = Joi.object(baseEducationSchema)
    .min(1)
    .messages({
        "object.min": "At least one field must be provided for update",
    });

module.exports = {
    createEducationSchema,
    updateEducationSchema,
};
