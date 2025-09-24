// User related test data
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

// Test user register data
exports.testUserRegister = {
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    role: userData.role
};

// Test user login data
exports.testUserLogin = {
    email: userData.email,
    password: userData.password,
};

// Test user reset password data
exports.testUserReset = {
    email: userData.email,
    password: userData.password,
};


// Test user's skills data
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


// Test user's experience data
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

// Exporting experience test data
exports.experiencesTestData = {
    ...experienceData
};

// Exporting experience test data for update (excluding endDate and isCurrent)
exports.experienceUpdateData = {
    jobTitle: experienceData.jobTitle,
    company: experienceData.company,
    employmentType: experienceData.employmentType,
    description: experienceData.description,
    startDate: experienceData.startDate
}


// Test user's project data
const projectData = {
    title: "Personal Portfolio Website",
    description: "A modern personal portfolio website showcasing my skills, projects, and contact information. Built with React, TailwindCSS, and Node.js backend.",
    shortDescription: "A personal portfolio to showcase my work and skills.",
    category: "Frontend",
    subcategory: "Frontend",
    technologies: ["React", "TailwindCSS", "Node.js", "MongoDB"],
    images: [
        {
            url: "https://res.cloudinary.com/demo/image/upload/v1723456789/portfolio-home.png",
            publicId: "portfolio-home",
            alt: "Homepage screenshot",
            caption: "Homepage view",
            isPrimary: true
        },
        {
            url: "https://res.cloudinary.com/demo/image/upload/v1723456789/portfolio-projects.png",
            publicId: "portfolio-projects",
            alt: "Projects page screenshot",
            caption: "Projects showcase",
            isPrimary: false
        }
    ],
    liveUrl: "https://myportfolio.com",
    githubUrl: "https://github.com/username/portfolio",
    status: "completed",
    featured: true,
    priority: 1,
    startDate: "2024-01-15T00:00:00.000Z",
    completedAt: "2024-02-28T00:00:00.000Z",
    challenges: [
        {
            title: "Responsive design",
            description: "Ensuring mobile-first responsive UI",
            solution: "Used TailwindCSS breakpoints and custom utilities"
        },
        {
            title: "SEO optimization",
            description: "Low Lighthouse SEO score initially",
            solution: "Improved meta tags, added sitemap, and semantic HTML"
        }
    ],
    features: [
        "Dark mode support",
        "Contact form with email integration",
        "Animated project cards"
    ],
    learnings: [
        "Improved TailwindCSS workflow",
        "Better understanding of SEO practices",
        "Experience with deploying on Vercel"
    ],
    isPublic: true
}

// Exporting project test data
exports.projectsTestData = {
    ...projectData
}

// Test project update data
exports.projectUpdateData = {
    title: projectData.title,
    description: projectData.description,
    category: projectData.category,
}


// Test user's education data
const educationData = {
    institution: "University of Example",
    degree: "Bachelor of Computer Applications",
    fieldOfStudy: "Information Technology",
    startDate: "2021-08-01",
    endDate: "2024-05-30",
    grade: "8.5/10",
    description: "Completed my Bachelor's degree with a focus on backend development and database management.",
    status: "completed",
    link: "https://www.universityofexample.edu",
    certificates: [
        {
            title: "Full Stack Web Development",
            url: "https://example.com/certificates/fullstack",
            issuedBy: "Coursera",
            issueDate: "2023-04-15"
        },
        {
            title: "Advanced Node.js",
            url: "https://example.com/certificates/nodejs",
            issuedBy: "Udemy",
            issueDate: "2023-09-01"
        }
    ]
}

// Exporting education test data
exports.educationTestData = {
    ...educationData
};

// Exporting education test data for update (excluding endDate and status)
exports.educationUpdateData = {
    institution: educationData.institution,
    degree: educationData.degree,
    fieldOfStudy: educationData.fieldOfStudy,
    startDate: educationData.startDate,
}
