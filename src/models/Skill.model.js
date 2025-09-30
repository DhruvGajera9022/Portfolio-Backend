const mongoose = require("mongoose");
const { SkillCategory, SkillLevel, ResourceType } = require("../enums/skill.enum");

/**
 * Certification schema
 */
const CertificationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        issuer: { type: String },
        url: { type: String },
        obtainedAt: { type: Date },
        expiresAt: { type: Date },
    },
    { _id: false }
);

/**
 * Resource schema
 */
const ResourceSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        url: { type: String, required: true },
        type: {
            type: String,
            enum: Object.values(ResourceType),
            default: ResourceType.OTHER,
        },
    },
    { _id: false }
);

/**
 * Skill schema
 */
const SkillSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Skill name is required"],
            trim: true,
            maxlength: 50,
            unique: true,
        },
        category: {
            type: String,
            enum: Object.values(SkillCategory),
            required: true,
            default: SkillCategory.OTHER,
        },
        subcategory: { type: String, trim: true },
        proficiency: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },
        yearsOfExperience: {
            type: Number,
            min: 0,
            default: 0,
        },
        level: {
            type: String,
            enum: Object.values(SkillLevel),
            default: SkillLevel.BEGINNER,
        },

        color: {
            type: String,
            match: /^#[0-9A-Fa-f]{6}$/,
        },
        description: {
            type: String,
            maxlength: 500,
            default: "",
        },
        projects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Project",
            },
        ],
        certifications: [CertificationSchema],
        resources: [ResourceSchema],
        featured: { type: Boolean, default: false },
        displayOrder: { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
    },
    { timestamps: true } // createdAt, updatedAt
);


module.exports = mongoose.model("Skill", SkillSchema);
