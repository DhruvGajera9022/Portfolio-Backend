/**
 * Enum definitions for Skills
 */

const SkillCategory = Object.freeze({
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    DATABASE: "Database",
    DEVOPS: "DevOps",
    OTHER: "Other",
});

const SkillLevel = Object.freeze({
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
    EXPERT: "Expert",
});

module.exports = {
    SkillCategory,
    SkillLevel,
};
