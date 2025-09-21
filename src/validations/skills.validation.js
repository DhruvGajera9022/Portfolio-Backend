const Joi = require("joi");
const { SkillCategory, SkillLevel, ResourceType } = require("../enums/skill.enum");

/**
 * Validation schema for creating/updating a Skill
 */
const skillSchema = Joi.object({
    name: Joi.string().max(50).required().messages({
        "string.empty": "Skill name is required",
        "string.max": "Skill name cannot exceed 50 characters",
    }),
    category: Joi.string()
        .valid(...Object.values(SkillCategory))
        .required()
        .messages({
            "any.only": `Category must be one of: ${Object.values(SkillCategory).join(", ")}`,
            "string.empty": "Category is required",
        }),
    subcategory: Joi.string().max(50).optional().allow("").messages({
        "string.max": "Subcategory cannot exceed 50 characters",
    }),
    proficiency: Joi.number().min(0).max(100).required().messages({
        "number.base": "Proficiency must be a number",
        "number.min": "Proficiency cannot be less than 0",
        "number.max": "Proficiency cannot exceed 100",
        "any.required": "Proficiency is required",
    }),
    yearsOfExperience: Joi.number().min(0).optional().messages({
        "number.base": "Years of experience must be a number",
        "number.min": "Years of experience cannot be less than 0",
    }),
    level: Joi.string()
        .valid(...Object.values(SkillLevel))
        .optional()
        .messages({
            "any.only": `Level must be one of: ${Object.values(SkillLevel).join(", ")}`,
        }),
    icon: Joi.object({
        url: Joi.string().uri().optional(),
        publicId: Joi.string().optional(),
        svg: Joi.string().optional(),
    }).optional(),
    color: Joi.string()
        .pattern(/^#[0-9A-Fa-f]{6}$/)
        .optional()
        .messages({
            "string.pattern.base": "Color must be a valid hex code, e.g., #FF5733",
        }),
    description: Joi.string().max(500).optional().allow("").messages({
        "string.max": "Description cannot exceed 500 characters",
    }),
    projects: Joi.array().items(Joi.string().hex().length(24)).optional(),
    certifications: Joi.array()
        .items(
            Joi.object({
                name: Joi.string().required().messages({ "string.empty": "Certification name is required" }),
                issuer: Joi.string().optional(),
                url: Joi.string().uri().optional(),
                obtainedAt: Joi.date().optional(),
                expiresAt: Joi.date().optional(),
            })
        )
        .optional(),
    resources: Joi.array()
        .items(
            Joi.object({
                title: Joi.string().required().messages({ "string.empty": "Resource title is required" }),
                url: Joi.string().uri().required().messages({ "string.empty": "Resource URL is required", "string.uri": "Resource URL must be valid" }),
                type: Joi.string()
                    .valid(...Object.values(ResourceType))
                    .optional()
                    .messages({ "any.only": `Resource type must be one of: ${Object.values(ResourceType).join(", ")}` }),
            })
        )
        .optional(),
    featured: Joi.boolean().optional(),
    displayOrder: Joi.number().optional(),
    isActive: Joi.boolean().optional(),
});

module.exports = {
    skillSchema,
};
