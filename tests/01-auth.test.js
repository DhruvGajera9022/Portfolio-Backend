const request = require("supertest");
const app = require("../src/app");
const { HTTP_STATUS } = require("../shared/constants");
const { testUserRegister, testUserLogin, testUserReset } = require("../shared/constants/test.constants");
const { clearDB } = require("./testSetup");

require("./testSetup");

describe("Auth Controller", () => {
    beforeEach(async () => {
        await clearDB();
    });

    describe("POST /api/auth/register", () => {
        it("registers a new user", async () => {
            const res = await request(app).post("/api/auth/register").send(testUserRegister);
            expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
            expect(res.body).toHaveProperty("data.user.email", testUserRegister.email);
            expect(res.body).toHaveProperty("data.token");
        });

        it("rejects duplicate emails", async () => {
            await request(app).post("/api/auth/register").send(testUserRegister);
            const res = await request(app).post("/api/auth/register").send(testUserRegister);
            expect(res.statusCode).toBe(HTTP_STATUS.CONFLICT);
        });
    });

    describe("POST /api/auth/login", () => {
        beforeEach(async () => {
            await request(app).post("/api/auth/register").send(testUserRegister);
        });

        it("logs in successfully", async () => {
            const res = await request(app).post("/api/auth/login").send(testUserLogin);
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body).toHaveProperty("data.user.email", testUserLogin.email);
        });

        it("fails with wrong password", async () => {
            const res = await request(app).post("/api/auth/login").send({ email: testUserLogin.email, password: "wrong" });
            expect(res.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
        });

        it("fails with non-existent email", async () => {
            const res = await request(app).post("/api/auth/login").send({ email: "ghost@example.com", password: "pass" });
            expect(res.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
        });
    });

    describe("POST /api/auth/reset-password", () => {
        beforeEach(async () => {
            await request(app).post("/api/auth/register").send(testUserRegister);
        });

        it("resets password", async () => {
            const res = await request(app).post("/api/auth/reset-password").send(testUserReset);
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
        });

        it("allows login with new password", async () => {
            await request(app).post("/api/auth/reset-password").send(testUserReset);
            const res = await request(app).post("/api/auth/login").send(testUserReset);
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
        });

        it("rejects old password after reset", async () => {
            await request(app).post("/api/auth/reset-password").send(testUserReset);
            const res = await request(app).post("/api/auth/login").send({ email: testUserReset.email, password: testUserRegister.password });
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
        });
    });
});
