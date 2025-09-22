const request = require("supertest");
const app = require("../src/app");
const { testUserRegister } = require("../shared/constants/test.constants");

// Register & return user + token
async function createTestUser(user = testUserRegister) {
    const res = await request(app)
        .post("/api/auth/register")
        .send(user);

    return {
        token: res.body?.data?.token,
        user: res.body?.data?.user,
    };
}

module.exports = { createTestUser };
