const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const { HTTP_STATUS } = require("../shared/constants");
const { skillsTestData } = require("../shared/constants/test.constants");
const { createTestUser } = require("./helpers");
const { clearDB } = require("./testSetup");

require("./testSetup");

describe("Skills Controller", () => {
    let token, skillId;

    beforeEach(async () => {
        await clearDB();
        const res = await createTestUser();
        token = res.token;
    });

    describe("POST /api/skills", () => {
        it("creates skill", async () => {
            const res = await request(app).post("/api/skills").set("Authorization", `Bearer ${token}`).send(skillsTestData);
            expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
            skillId = res.body.data._id;
        });

        it("rejects duplicate", async () => {
            await request(app).post("/api/skills").set("Authorization", `Bearer ${token}`).send(skillsTestData);
            const res = await request(app).post("/api/skills").set("Authorization", `Bearer ${token}`).send(skillsTestData);
            expect(res.statusCode).toBe(HTTP_STATUS.CONFLICT);
        });
    });

    describe("GET /api/skills", () => {
        it("fetches all", async () => {
            await request(app).post("/api/skills").set("Authorization", `Bearer ${token}`).send(skillsTestData);
            const res = await request(app).get("/api/skills").set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe("PUT /api/skills/:id", () => {
        beforeEach(async () => {
            const res = await request(app).post("/api/skills").set("Authorization", `Bearer ${token}`).send(skillsTestData);
            skillId = res.body.data._id;
        });

        it("updates skill", async () => {
            const res = await request(app).put(`/api/skills/${skillId}`).set("Authorization", `Bearer ${token}`).send({ ...skillsTestData, proficiency: 80 });
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
        });
    });

    describe("DELETE /api/skills/:id", () => {
        beforeEach(async () => {
            const res = await request(app).post("/api/skills").set("Authorization", `Bearer ${token}`).send(skillsTestData);
            skillId = res.body.data._id;
        });

        it("deletes skill", async () => {
            const res = await request(app).delete(`/api/skills/${skillId}`).set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
        });
    });
});
