// tests/auth.test.js
const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/User.model");
const { HTTP_STATUS } = require("../shared/constants");

// Import the setup file
require("./testSetup");

describe("Auth Controller", () => {
    const testUserRegister = {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "Password123!",
        role: "user"
    };

    const testUserLogin = {
        email: "john@example.com",
        password: "Password123!",
    };

    const testUserReset = {
        email: "john@example.com",
        password: "Password1234!",
    };

    /* ================= Register Tests ================= */
    describe("POST /api/auth/register", () => {
        it("Should register a new user", async () => {
            const res = await request(app)
                .post("/api/auth/register")
                .send(testUserRegister);

            expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
            expect(res.body).toHaveProperty("data.user.email", testUserRegister.email);
            expect(res.body).toHaveProperty("data.token");
        });

        it("Should not allow duplicate emails", async () => {
            // First insert
            await request(app)
                .post("/api/auth/register")
                .send(testUserRegister);

            // Try duplicate insert
            const res = await request(app)
                .post("/api/auth/register")
                .send(testUserRegister);

            expect(res.statusCode).toBe(HTTP_STATUS.CONFLICT);
            expect(res.body).toHaveProperty("message");
        });
    });

    /* ================= Login Tests ================= */
    describe("POST /api/auth/login", () => {
        beforeAll(async () => {
            // Ensure user exists once before login tests
            await request(app)
                .post("/api/auth/register")
                .send(testUserRegister);
        });

        it("Should login a user", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send(testUserLogin);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body).toHaveProperty("data.user.email", testUserLogin.email);
            expect(res.body).toHaveProperty("data.token");
        });

        it("Should fail login with wrong password", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({ email: testUserLogin.email, password: "WrongPassword!" });

            expect(res.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
            expect(res.body).toHaveProperty("message");
        });

        it("Should fail login with non-existent email", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({ email: "nonexistent@example.com", password: "Password123!" });

            expect(res.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
            expect(res.body).toHaveProperty("message");
        });
    });

    /* ================= Reset Password Tests ================= */
    describe("POST /api/auth/reset-password", () => {
        beforeAll(async () => {
            // Ensure user exists once before reset-password tests
            await request(app)
                .post("/api/auth/register")
                .send(testUserRegister);
        });

        it("Should reset password for existing user", async () => {
            const res = await request(app)
                .post("/api/auth/reset-password")
                .send(testUserReset);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body).toHaveProperty("message");
        });

        it("Should allow login with new password after reset", async () => {
            // Reset password first
            await request(app)
                .post("/api/auth/reset-password")
                .send(testUserReset);

            const res = await request(app)
                .post("/api/auth/login")
                .send({ email: testUserReset.email, password: testUserReset.password });

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body).toHaveProperty("data.token");
        });

        it("Should fail login with old password after reset", async () => {
            const res = await request(app)
                .post("/api/auth/login")
                .send({ email: testUserReset.email, password: testUserRegister.password });

            expect(res.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
            expect(res.body).toHaveProperty("message");
        });

        it("Should return 404 for non-existent email", async () => {
            const res = await request(app)
                .post("/api/auth/reset-password")
                .send({ email: "nonexistent@example.com", password: "NewPassword123!" });

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body).toHaveProperty("message");
        });

        it("Should return 400 if email or password is missing", async () => {
            const res = await request(app)
                .post("/api/auth/reset-password")
                .send({ email: testUserRegister.email });

            expect(res.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
            expect(res.body).toHaveProperty("message");
        });
    });
});
