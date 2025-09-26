const mongoose = require("mongoose");
const { PROJECT_CATEGORY, PROJECT_STATUS } = require("../enums/project.enum");
const slugify = require("slugify");

/**
 * Project Schema
 * @typedef {Object} Project
 */
const projectSchema = new mongoose.Schema(
    {
        // Basic Information
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
            maxlength: [100, "Project title cannot exceed 100 characters"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Project description is required"],
            trim: true,
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
        shortDescription: {
            type: String,
            trim: true,
            maxlength: [300, "Short description cannot exceed 300 characters"],
        },

        // Category
        category: {
            type: String,
            required: [true, "Project category is required"],
            enum: Object.values(PROJECT_CATEGORY),
        },
        subcategory: {
            type: String,
            trim: true,
        },

        // Tech Stack
        technologies: [
            {
                type: String,
                trim: true,
                maxlength: [50, "Technology name cannot exceed 50 characters"],
            },
        ],

        // Media
        images: [
            {
                url: { type: String, required: true },
                publicId: String,
                alt: String,
                caption: String,
                isPrimary: { type: Boolean, default: false },
            },
        ],

        // Links
        liveUrl: {
            type: String,
            trim: true,
            match: [/^https:\/\/.+/, "Live URL must start with https://"],
        },
        githubUrl: {
            type: String,
            trim: true,
            match: [/^https:\/\/.+/, "GitHub URL must start with https://"],
        },

        // Status & Flags
        status: {
            type: String,
            enum: Object.values(PROJECT_STATUS),
            default: PROJECT_STATUS.COMPLETED,
        },
        featured: {
            type: Boolean,
            default: false,
        },
        priority: {
            type: Number,
            default: 0,
        },

        // Timeline
        startDate: Date,
        completedAt: Date,

        // Challenges & Features
        challenges: [
            {
                title: String,
                description: String,
                solution: String,
            },
        ],
        features: [
            {
                type: String,
                trim: true,
            },
        ],
        learnings: [
            {
                type: String,
                trim: true,
            },
        ],

        // Visibility
        isPublic: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

projectSchema.pre("save", function (next) {
    if (!this.slug && this.title) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = mongoose.model("Projects", projectSchema);
