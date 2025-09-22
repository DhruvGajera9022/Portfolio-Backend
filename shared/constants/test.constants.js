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


const testSkill = {
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

exports.skillsTestData = {
    ...testSkill
}
