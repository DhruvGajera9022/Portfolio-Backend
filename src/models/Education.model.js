const mongoose = require("mongoose");

/**
 * Education Schema
 * @typedef {Object} Education
 */
const certificateSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: [200, "Certificate title cannot exceed 200 characters"],
        },
        url: {
            type: String,
            trim: true,
            match: [
                /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-\._~:/?#[\]@!$&'()*+,;=]*)?$/,
                "Please enter a valid URL",
            ],
        },
        issuedBy: {
            type: String,
            trim: true,
            maxlength: [200, "Issuer name cannot exceed 200 characters"],
        },
        issueDate: {
            type: Date,
        },
    },
    { _id: false }
);

const educationSchema = new mongoose.Schema(
    {
        institution: {
            type: String,
            required: [true, "Institution name is required"],
            trim: true,
            maxlength: [200, "Institution name cannot exceed 200 characters"],
        },
        degree: {
            type: String,
            required: [true, "Degree is required"],
            trim: true,
            maxlength: [100, "Degree cannot exceed 100 characters"],
        },
        fieldOfStudy: {
            type: String,
            required: [true, "Field of study is required"],
            trim: true,
            maxlength: [100, "Field of study cannot exceed 100 characters"],
        },
        startDate: {
            type: Date,
            required: [true, "Start date is required"],
        },
        endDate: {
            type: Date,
        },
        grade: {
            type: String,
            trim: true,
            maxlength: [20, "Grade cannot exceed 20 characters"],
        },
        description: {
            type: String,
            trim: true,
            maxlength: [1000, "Description cannot exceed 1000 characters"],
        },
        status: {
            type: String,
            enum: ["completed", "in-progress"],
            default: "completed",
        },
        certificates: {
            type: [certificateSchema],
            default: [],
        },
        link: {
            type: String,
            trim: true,
            match: [
                /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-\._~:/?#[\]@!$&'()*+,;=]*)?$/,
                "Please enter a valid URL",
            ],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Education", educationSchema);
