/**
 * Send a standardized success response
 *
 * @param {import('express').Response} res - Express response object
 * @param {Object} options - Options for response
 * @param {number} [options.statusCode=200] - HTTP status code
 * @param {string} [options.message='Success'] - Success message
 * @param {*} [options.data=null] - Data to send in response
 */
const successResponse = (res, { statusCode = 200, message = "Success", data = null }) => {
    return res.status(statusCode).json({
        success: true,
        message: message || "Success",
        data: data !== undefined ? data : null,
    });
};

/**
 * Send a standardized error response
 *
 * @param {import('express').Response} res - Express response object
 * @param {Object} options - Options for response
 * @param {number} [options.statusCode=500] - HTTP status code
 * @param {string} [options.message='Something went wrong'] - Error message
 * @param {*} [options.errors=null] - Optional detailed error object
 */
const errorResponse = (res, { statusCode = 500, message = "Something went wrong", errors = null }) => {
    return res.status(statusCode).json({
        success: false,
        message: message || "Something went wrong",
        errors: errors !== undefined ? errors : null,
    });
};

module.exports = {
    successResponse,
    errorResponse,
};
