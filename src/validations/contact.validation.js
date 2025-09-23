const Joi = require("joi");

/**
 * Contact update validation schema (PATCH/PUT)
 */
const contactSchema = Joi.object({
    name: Joi.string().max(100).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string()
        .pattern(/^[\+]?[1-9][\d]{0,15}$/)
        .optional(),
    company: Joi.string().max(100).optional(),
    subject: Joi.string().max(200).optional(),
    message: Joi.string().max(5000).optional(),
    projectType: Joi.string()
        .valid("Web Development", "Mobile App", "UI/UX Design", "Consultation", "Other")
        .optional(),
    budget: Joi.string()
        .valid("Under $1K", "$1K-$5K", "$5K-$10K", "$10K-$25K", "$25K+", "Not Sure")
        .optional(),
    timeline: Joi.string()
        .valid("ASAP", "1-2 weeks", "1 month", "2-3 months", "3+ months", "Flexible")
        .optional(),
    attachments: Joi.array().items(
        Joi.object({
            fileName: Joi.string(),
            url: Joi.string().uri(),
            publicId: Joi.string(),
            fileSize: Joi.number(),
            mimeType: Joi.string(),
        })
    ).optional(),
    status: Joi.string()
        .valid("new", "read", "replied", "in-progress", "completed", "archived")
        .optional(),
    priority: Joi.string().valid("low", "medium", "high", "urgent").optional(),
    source: Joi.string().valid("website", "api", "referral").optional(),
    followUpDate: Joi.date().optional(),
    isFollowUpComplete: Joi.boolean().optional(),
}).min(1); // require at least one field to update

module.exports = {
    contactSchema
};
