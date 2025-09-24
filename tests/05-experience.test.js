const request = require("supertest");
const app = require("../src/app");
const { HTTP_STATUS, MESSAGES } = require("../shared/constants");
const { experiencesTestData, experienceUpdateData } = require("../shared/constants/test.constants");
const { createTestUser } = require("./helpers");
const { clearDB } = require("./testSetup");

require("./testSetup");

jest.mock('../src/config/cloudinary.config.js', () => ({
    uploader: {
        destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
}));


describe("Experience Controller", () => {
    let token, experienceId;
    let invalidId = "68d3868514b1796d545893b0"

    beforeEach(async () => {
        await clearDB();
        const res = await createTestUser();
        token = res.token;
    });

    describe("POST /api/experience", () => {
        it("creates an experience", async () => {
            const res = await request(app)
                .post("/api/experience")
                .set("Authorization", `Bearer ${token}`)
                .send(experiencesTestData);

            expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.EXPERIENCE_CREATED_SUCCESS);
            experienceId = res.body.data._id;
        });

        it("rejects duplicate experience", async () => {
            await request(app)
                .post("/api/experience")
                .set("Authorization", `Bearer ${token}`)
                .send(experiencesTestData);

            const res = await request(app)
                .post("/api/experience")
                .set("Authorization", `Bearer ${token}`)
                .send(experiencesTestData);

            expect(res.statusCode).toBe(HTTP_STATUS.CONFLICT);
        });
    });

    describe("GET /api/experience", () => {
        it("fetches all experiences", async () => {
            await request(app)
                .post("/api/experience")
                .set("Authorization", `Bearer ${token}`)
                .send(experiencesTestData);

            const res = await request(app)
                .get("/api/experience")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe("GET /api/experience/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/experience")
                .set("Authorization", `Bearer ${token}`)
                .send(experiencesTestData);

            experienceId = res.body.data._id;
        });

        it("fetches experience by ID", async () => {
            const res = await request(app)
                .get(`/api/experience/${experienceId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.data._id).toBe(experienceId);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .get(`/api/experience/${invalidId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.EXPERIENCE_NOT_FOUND);
        });
    });

    describe("PUT /api/experience/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/experience")
                .set("Authorization", `Bearer ${token}`)
                .send(experiencesTestData);

            experienceId = res.body.data._id;
        });

        it("updates experience", async () => {
            const updatedData = { ...experiencesTestData, jobTitle: "Lead Software Engineer" };

            const res = await request(app)
                .put(`/api/experience/${experienceId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(updatedData);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.EXPERIENCE_UPDATE_SUCCESS);
            expect(res.body.data.jobTitle).toBe("Lead Software Engineer");
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .put(`/api/experience/${invalidId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(experienceUpdateData);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.EXPERIENCE_NOT_FOUND);
        });
    });

    describe("DELETE /api/experience/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/experience")
                .set("Authorization", `Bearer ${token}`)
                .send(experiencesTestData);

            experienceId = res.body.data._id;
        });

        it("deletes experience", async () => {
            const res = await request(app)
                .delete(`/api/experience/${experienceId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.EXPERIENCE_DELETE_SUCCESS);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .delete(`/api/experience/${invalidId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.EXPERIENCE_NOT_FOUND);
        });
    });
});
