/**
 * Validation Middleware
 * Validates request body against a given Joi schema
 *
 * @param {Object} schema - Joi schema to validate against
 * @returns {import('express').RequestHandler} Express middleware
 */
const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: error.details.map((detail) => detail.message),
            });
        }

        next();
    };
};

module.exports = validateRequest;
