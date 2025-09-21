/**
 * Enum definitions for Skills and related entities
 */

const SkillCategory = Object.freeze({
    FRONTEND: "Frontend",
    BACKEND: "Backend",
    DATABASE: "Database",
    DEVOPS: "DevOps",
    MOBILE: "Mobile",
    DESIGN: "Design",
    TOOLS: "Tools",
    SOFT_SKILLS: "Soft Skills",
    OTHER: "Other",
});

const SkillLevel = Object.freeze({
    BEGINNER: "Beginner",
    INTERMEDIATE: "Intermediate",
    ADVANCED: "Advanced",
    EXPERT: "Expert",
});

const ResourceType = Object.freeze({
    COURSE: "course",
    BOOK: "book",
    DOCUMENTATION: "documentation",
    TUTORIAL: "tutorial",
    OTHER: "other",
});

module.exports = {
    SkillCategory,
    SkillLevel,
    ResourceType,
};
