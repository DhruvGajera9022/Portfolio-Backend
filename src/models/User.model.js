const mongoose = require("mongoose");

/**
 * User Schema
 * @typedef {Object} User
 */
const userSchema = new mongoose.Schema(
    {
        // Personal Information
        firstName: {
            type: String,
            required: [true, "First name is required"],
            trim: true,
            maxlength: [50, "First name cannot exceed 50 characters"],
        },
        lastName: {
            type: String,
            required: [true, "Last name is required"],
            trim: true,
            maxlength: [50, "Last name cannot exceed 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                "Please enter a valid email",
            ],
            index: true, // faster lookups
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [8, "Password must be at least 8 characters"],
            select: false, // don't return password by default
        },

        // Profile Information
        avatar: {
            url: String,
            publicId: String,
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
        },
        location: {
            city: String,
            state: String,
            country: String,
            coordinates: {
                latitude: Number,
                longitude: Number,
            },
        },

        // Professional Information
        title: {
            type: String,
            trim: true,
            maxlength: [100, "Title cannot exceed 100 characters"],
        },
        bio: {
            type: String,
            trim: true,
            maxlength: [1000, "Bio cannot exceed 1000 characters"],
        },
        resume: {
            url: String,
            publicId: String,
            fileName: String,
            uploadedAt: Date,
        },

        // Social Links
        socialLinks: {
            website: String,
            linkedin: String,
            github: String,
            twitter: String,
            instagram: String,
        },

        // System Fields
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// Virtual full name field
userSchema.virtual("fullName").get(function () {
    return `${this.firstName} ${this.lastName}`;
});

module.exports = mongoose.model("User", userSchema);
