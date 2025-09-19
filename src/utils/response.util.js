/**
 * Send a standardized success response
 *
 * @param {import('express').Response} res - Express response object
 * @param {Object} options - Options for response
 * @param {number} [options.statusCode=200] - HTTP status code
 * @param {string} [options.message='Success'] - Success message
 * @param {Object} [options.data={}] - Data to send in response
 */
const successResponse = (res, { statusCode = 200, message = "Success", data = {} }) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

/**
 * Send a standardized error response
 *
 * @param {import('express').Response} res - Express response object
 * @param {Object} options - Options for response
 * @param {number} [options.statusCode=500] - HTTP status code
 * @param {string} [options.message='Something went wrong'] - Error message
 * @param {Object} [options.errors={}] - Optional detailed error object
 */
const errorResponse = (res, { statusCode = 500, message = "Something went wrong", errors = {} }) => {
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};
