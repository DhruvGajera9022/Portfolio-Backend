const request = require("supertest");
const app = require("../src/app");
const { HTTP_STATUS, MESSAGES } = require("../shared/constants");
const { educationTestData, educationUpdateData } = require("../shared/constants/test.constants");
const { createTestUser } = require("./helpers");
const { clearDB } = require("./testSetup");

require("./testSetup");

describe("Education Controller", () => {
    let token, educationId;
    let invalidId = "64f1e5b2e1f4b9c123456789";

    beforeEach(async () => {
        await clearDB();
        const res = await createTestUser();
        token = res.token;
    });

    describe("POST /api/education", () => {
        it("creates an education entry", async () => {
            const res = await request(app)
                .post("/api/education")
                .set("Authorization", `Bearer ${token}`)
                .send(educationTestData);

            expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.EDUCATION_CREATE_SUCCESS);
            educationId = res.body.data._id;
        });

        it("rejects duplicate education (same institution & degree)", async () => {
            await request(app)
                .post("/api/education")
                .set("Authorization", `Bearer ${token}`)
                .send(educationTestData);

            const res = await request(app)
                .post("/api/education")
                .set("Authorization", `Bearer ${token}`)
                .send(educationTestData);

            expect(res.statusCode).toBe(HTTP_STATUS.CONFLICT);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.EDUCATION_DUPLICATE);
        });
    });

    describe("GET /api/education", () => {
        it("fetches all education entries", async () => {
            await request(app)
                .post("/api/education")
                .set("Authorization", `Bearer ${token}`)
                .send(educationTestData);

            const res = await request(app)
                .get("/api/education")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe("GET /api/education/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/education")
                .set("Authorization", `Bearer ${token}`)
                .send(educationTestData);

            educationId = res.body.data._id;
        });

        it("fetches education by ID", async () => {
            const res = await request(app)
                .get(`/api/education/${educationId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.data._id).toBe(educationId);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .get(`/api/education/${invalidId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.EDUCATION_NOT_FOUND);
        });
    });

    describe("PUT /api/education/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/education")
                .set("Authorization", `Bearer ${token}`)
                .send(educationTestData);

            educationId = res.body.data._id;
        });

        it("updates education entry", async () => {
            const res = await request(app)
                .put(`/api/education/${educationId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(educationUpdateData);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.EDUCATION_UPDATE_SUCCESS);
            expect(res.body.data.degree).toBe(educationUpdateData.degree);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .put(`/api/education/${invalidId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(educationUpdateData);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.EDUCATION_NOT_FOUND);
        });
    });

    describe("DELETE /api/education/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/education")
                .set("Authorization", `Bearer ${token}`)
                .send(educationTestData);

            educationId = res.body.data._id;
        });

        it("deletes education entry", async () => {
            const res = await request(app)
                .delete(`/api/education/${educationId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.EDUCATION_DELETE_SUCCESS);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .delete(`/api/education/${invalidId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.EDUCATION_NOT_FOUND);
        });
    });
});
