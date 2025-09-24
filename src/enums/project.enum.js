/**
 * Enum constants for Project Model
 */

const PROJECT_CATEGORY = Object.freeze({
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    FULLSTACK: "Full Stack",
    MOBILE: "Mobile",
    DESKTOP: "Desktop",
    UI_UX: "UI/UX",
    OTHER: "Other",
});

const PROJECT_STATUS = Object.freeze({
    PLANNING: "planning",
    IN_PROGRESS: "in-progress",
    COMPLETED: "completed",
    ON_HOLD: "on-hold",
    CANCELLED: "cancelled",
});

module.exports = {
    PROJECT_CATEGORY,
    PROJECT_STATUS,
};
