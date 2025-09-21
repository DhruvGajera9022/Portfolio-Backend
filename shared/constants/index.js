/**
 * HTTP Status Codes
 */
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
};

/**
 * Common API Messages
 */
const MESSAGES = {
    SUCCESS: "Success",
    SERVER_ERROR: "Internal server error",
    DUPLICATE_ENTRY: "Email already exists",
    INVALID_CREDENTIALS: "Invalid credentials",
    NOT_FOUND: "Resource not found",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden",
    TOKEN_EXPIRED: "Token expired or invalid",
    PASSWORD_RESET_SENT: "Password reset token sent to email",
    PASSWORD_RESET_SUCCESS: "Password reset successfully",
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    USER_NOT_FOUND: "User not found",
    INVALID_TOKEN: "Invalid or expired token",
    USER_PROFILE_FETCHED: "User profile fetch successfully",
};

/**
 * User Roles
 */
const USER_ROLES = {
    ADMIN: "admin",
    USER: "user",
    GUEST: "guest",
};

/**
 * Other constants
 */
const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

module.exports = {
    HTTP_STATUS,
    MESSAGES,
    USER_ROLES,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
};
