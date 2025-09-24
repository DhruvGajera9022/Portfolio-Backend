const userData = {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    password: "Password123!",
    role: "user",
    phone: "1234567890",
    location: {
        city: "Abc",
        state: "Abc",
        country: "Abc"
    },
    title: "Developer",
    bio: "This is developer bio"
}


exports.testUserRegister = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    role: userData.role
};

exports.testUserLogin = {
    email: userData.email,
    password: userData.password,
};

exports.testUserReset = {
    email: userData.email,
    password: userData.password,
};


exports.skillsTestData = {
    name: "React.js",
    category: "Frontend",
    subcategory: "UI Framework",
    proficiency: 85,
    yearsOfExperience: 3,
    level: "Intermediate",
    icon: {
        url: "https://example.com/react-icon.png",
        publicId: "react-icon-123",
        svg: "<svg>...</svg>"
    },
    color: "#61DAFB",
    description: "React.js skill for building UIs",
    projects: ["64f8e8b5f6d1c2a1b0d9f123"],
    certifications: [
        {
            name: "React Developer Certificate",
            issuer: "Udemy",
            url: "https://example.com/certificate",
            obtainedAt: "2022-05-15T00:00:00.000Z",
            expiresAt: "2025-05-15T00:00:00.000Z",
        }
    ],
    resources: [
        {
            title: "React Docs",
            url: "https://react.dev",
            type: "documentation"
        }
    ],
    featured: true,
    displayOrder: 1,
    isActive: true,
};

const experienceData = {
    jobTitle: "Senior Software Engineer",
    company: "Tech Solutions Ltd",
    companyUrl: "https://www.techsolutions.com",
    employmentType: "Full-time",
    workMode: "Remote",
    location: {
        city: "San Francisco",
        state: "California",
        country: "USA"
    },
    startDate: "2022-05-01T00:00:00.000Z",
    endDate: null,
    isCurrent: true,
    description: "Worked on building scalable web applications and APIs using Node.js and React.",
    responsibilities: [
        "Develop and maintain RESTful APIs",
        "Collaborate with frontend team to integrate APIs"
    ],
    achievements: [
        "Improved API response time by 40%",
        "Mentored 3 junior developers"
    ],
    technologies: ["Node.js", "Express", "MongoDB", "React", "Docker"],
    projects: [
        {
            name: "Internal Dashboard",
            description: "Built a dashboard for internal analytics and monitoring.",
            technologies: ["React", "Chart.js", "Node.js"],
            url: "https://dashboard.techsolutions.com"
        }
    ],
    featured: true,
    displayOrder: 1
}

exports.experiencesTestData = {
    ...experienceData
};

exports.experienceUpdateData = {
    jobTitle: experienceData.jobTitle,
    company: experienceData.company,
    employmentType: experienceData.employmentType,
    description: experienceData.description,
    startDate: experienceData.startDate
}
