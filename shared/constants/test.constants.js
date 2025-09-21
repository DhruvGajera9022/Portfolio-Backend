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
