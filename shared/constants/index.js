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
    // General
    SUCCESS: "Success",
    SERVER_ERROR: "Internal server error",
    DUPLICATE_ENTRY: "Entry already exists",
    NOT_FOUND: "Resource not found",
    UNAUTHORIZED: "Unauthorized access",
    FORBIDDEN: "Forbidden",
    TOKEN_EXPIRED: "Token expired or invalid",

    // User / Auth
    INVALID_CREDENTIALS: "Invalid credentials",
    PASSWORD_RESET_SENT: "Password reset token sent to email",
    PASSWORD_RESET_SUCCESS: "Password reset successfully",
    REGISTER_SUCCESS: "User registered successfully",
    LOGIN_SUCCESS: "Login successful",
    USER_NOT_FOUND: "User not found",
    INVALID_TOKEN: "Invalid or expired token",
    USER_PROFILE_FETCHED: "User profile fetched successfully",

    // Skills
    SKILL_FETCH_SUCCESS: "Skill fetched successfully",
    SKILLS_FETCH_SUCCESS: "Skills fetched successfully",
    SKILL_CREATE_SUCCESS: "Skill created successfully",
    SKILL_UPDATE_SUCCESS: "Skill updated successfully",
    SKILL_DELETE_SUCCESS: "Skill deleted successfully",
    SKILL_NOT_FOUND: "Skill not found",

    // Contact
    CONTACT_CREATED_SUCCESS: "Contact created successfully",
    CONTACTS_FETCH_SUCCESS: "Contacts fetched successfully",
    CONTACT_FETCH_SUCCESS: "Contact fetched successfully",
    CONTACT_UPDATE_SUCCESS: "Contact updated successfully",
    CONTACT_DELETE_SUCCESS: "Contact deleted successfully",
    CONTACT_NOT_FOUND: "Contact not found",
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
