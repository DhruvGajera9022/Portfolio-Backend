const mongoose = require("mongoose");

/**
 * Experience Schema
 * @typedef {Object} Experience
 */
const experienceSchema = new mongoose.Schema(
    {
        jobTitle: {
            type: String,
            required: [true, "Job title is required"],
            maxlength: [100, "Job title cannot exceed 100 characters"],
            trim: true,
        },
        company: {
            type: String,
            required: [true, "Company name is required"],
            maxlength: [100, "Company name cannot exceed 100 characters"],
            trim: true,
        },
        companyUrl: {
            type: String,
            match: [/^https?:\/\/.+/, "Please enter a valid URL"],
        },
        employmentType: {
            type: String,
            required: [true, "Employment type is required"],
            enum: ["Full-time", "Part-time", "Contract", "Freelance", "Internship"],
        },
        workMode: {
            type: String,
            enum: ["On-site", "Remote", "Hybrid"],
            default: "On-site",
        },
        location: {
            city: String,
            state: String,
            country: String,
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
        },
        isCurrent: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: [true, "Job description is required"],
            maxlength: [2000, "Description cannot exceed 2000 characters"],
        },
        responsibilities: {
            type: [String],
        },
        achievements: {
            type: [String],
        },
        technologies: {
            type: [String],
        },
        projects: [
            {
                name: String,
                description: String,
                technologies: [String],
                url: String,
            },
        ],
        featured: {
            type: Boolean,
            default: false,
        },
        displayOrder: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Experience", experienceSchema);
