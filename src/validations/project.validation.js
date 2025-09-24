const Joi = require("joi");
const { PROJECT_CATEGORY, PROJECT_STATUS } = require("../enums/project.enum");

// Common project fields
const baseProjectSchema = {
    title: Joi.string().max(100).trim().messages({
        "string.max": "Title cannot exceed 100 characters",
        "string.empty": "Title is required",
    }),
    slug: Joi.string().trim().lowercase(),

    description: Joi.string().max(2000).trim().messages({
        "string.max": "Description cannot exceed 2000 characters",
        "string.empty": "Description is required",
    }),
    shortDescription: Joi.string().max(300).trim().messages({
        "string.max": "Short description cannot exceed 300 characters",
    }),

    category: Joi.string()
        .valid(...Object.values(PROJECT_CATEGORY))
        .messages({
            "any.only": `Category must be one of: ${Object.values(PROJECT_CATEGORY).join(", ")}`,
            "string.empty": "Category is required",
        }),
    subcategory: Joi.string().trim(),

    technologies: Joi.array().items(
        Joi.string().max(50).trim().messages({
            "string.max": "Technology name cannot exceed 50 characters",
        })
    ),

    images: Joi.array().items(
        Joi.object({
            url: Joi.string().uri().required().messages({
                "string.uri": "Image URL must be a valid URI",
                "any.required": "Image URL is required",
            }),
            publicId: Joi.string(),
            alt: Joi.string(),
            caption: Joi.string(),
            isPrimary: Joi.boolean(),
        })
    ),
    videos: Joi.array().items(
        Joi.object({
            url: Joi.string().uri().messages({
                "string.uri": "Video URL must be a valid URI",
            }),
            publicId: Joi.string(),
            title: Joi.string(),
            duration: Joi.number().min(0),
        })
    ),

    liveUrl: Joi.string().uri().messages({
        "string.uri": "Live URL must be a valid URI",
    }),
    githubUrl: Joi.string().uri().messages({
        "string.uri": "GitHub URL must be a valid URI",
    }),

    status: Joi.string()
        .valid(...Object.values(PROJECT_STATUS))
        .default(PROJECT_STATUS.COMPLETED)
        .messages({
            "any.only": `Status must be one of: ${Object.values(PROJECT_STATUS).join(", ")}`,
        }),
    featured: Joi.boolean().default(false),
    priority: Joi.number().default(0),

    startDate: Joi.date(),
    completedAt: Joi.date(),

    challenges: Joi.array().items(
        Joi.object({
            title: Joi.string().trim(),
            description: Joi.string().trim(),
            solution: Joi.string().trim(),
        })
    ),
    features: Joi.array().items(Joi.string().trim()),
    learnings: Joi.array().items(Joi.string().trim()),

    isPublic: Joi.boolean().default(true),
};

// Schemas
const createProjectSchema = Joi.object({
    ...baseProjectSchema,
    title: baseProjectSchema.title.required(),
    description: baseProjectSchema.description.required(),
    category: baseProjectSchema.category.required(),
});

const updateProjectSchema = Joi.object(baseProjectSchema)
    .min(1)
    .messages({
        "object.min": "At least one field must be provided for update",
    });

module.exports = {
    createProjectSchema,
    updateProjectSchema,
};
