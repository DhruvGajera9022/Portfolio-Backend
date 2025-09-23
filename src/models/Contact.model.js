const mongoose = require("mongoose");

/**
 * Contact Schema
 * @typedef {Object} Contact
 */
const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Sender's name is required"],
            trim: true,
            maxlength: [100, "Name cannot exceed 100 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
                "Please enter a valid email",
            ],
            index: true,
        },
        phone: {
            type: String,
            trim: true,
            match: [/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"],
        },
        company: {
            type: String,
            trim: true,
            maxlength: [100, "Company name cannot exceed 100 characters"],
        },
        subject: {
            type: String,
            required: [true, "Subject is required"],
            trim: true,
            maxlength: [200, "Subject cannot exceed 200 characters"],
        },
        message: {
            type: String,
            required: [true, "Message is required"],
            trim: true,
            maxlength: [5000, "Message cannot exceed 5000 characters"],
        },
        projectType: {
            type: String,
            enum: ["Web Development", "Mobile App", "UI/UX Design", "Consultation", "Other"],
        },
        budget: {
            type: String,
            enum: ["Under $1K", "$1K-$5K", "$5K-$10K", "$10K-$25K", "$25K+", "Not Sure"],
        },
        timeline: {
            type: String,
            enum: ["ASAP", "1-2 weeks", "1 month", "2-3 months", "3+ months", "Flexible"],
        },
        attachments: [
            {
                fileName: String,
                url: String,
                publicId: String,
                fileSize: Number,
                mimeType: String,
            },
        ],
        status: {
            type: String,
            enum: ["new", "read", "replied", "in-progress", "completed", "archived"],
            default: "new",
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high", "urgent"],
            default: "medium",
        },
        response: {
            message: String,
            respondedAt: Date,
            respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        },
        notes: [
            {
                content: String,
                addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                addedAt: { type: Date, default: Date.now },
            },
        ],
        source: {
            type: String,
            enum: ["website", "api", "referral"],
            default: "website",
        },
        userAgent: String,
        ipAddress: String,
        followUpDate: Date,
        isFollowUpComplete: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact", contactSchema);
