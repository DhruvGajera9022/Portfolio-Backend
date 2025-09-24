const request = require("supertest");
const app = require("../src/app");
const { HTTP_STATUS, MESSAGES } = require("../shared/constants");
const { projectsTestData, projectUpdateData } = require("../shared/constants/test.constants");
const { createTestUser } = require("./helpers");
const { clearDB } = require("./testSetup");

require("./testSetup");

// Mock Cloudinary uploader
jest.mock('../src/config/cloudinary.config.js', () => ({
    uploader: {
        upload: jest.fn().mockResolvedValue({ secure_url: "https://fakeurl.com/image.png", public_id: "fake-id" }),
        destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
}));

describe("Project Controller", () => {
    let token, projectId;
    let invalidId = "68d3868514b1796d545893b0";

    beforeEach(async () => {
        await clearDB();
        const res = await createTestUser();
        token = res.token;
    });

    describe("POST /api/project", () => {
        it("creates a project", async () => {
            const res = await request(app)
                .post("/api/project")
                .set("Authorization", `Bearer ${token}`)
                .send(projectsTestData)

            expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.PROJECT_CREATE_SUCCESS);
            projectId = res.body.data._id;
        });

        it("rejects duplicate project", async () => {
            await request(app)
                .post("/api/project")
                .set("Authorization", `Bearer ${token}`)
                .send(projectsTestData)

            const res = await request(app)
                .post("/api/project")
                .set("Authorization", `Bearer ${token}`)
                .send(projectsTestData);

            expect(res.statusCode).toBe(HTTP_STATUS.CONFLICT);
        });
    });

    describe("GET /api/project", () => {
        it("fetches all projects", async () => {
            await request(app)
                .post("/api/project")
                .set("Authorization", `Bearer ${token}`)
                .field("title", projectsTestData.title)
                .field("description", projectsTestData.description);

            const res = await request(app)
                .get("/api/project")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
        });
    });

    describe("GET /api/project/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/project")
                .set("Authorization", `Bearer ${token}`)
                .send(projectsTestData);

            projectId = res.body.data._id;
        });

        it("fetches project by ID", async () => {
            const res = await request(app)
                .get(`/api/project/${projectId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.data._id).toBe(projectId);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .get(`/api/project/${invalidId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.PROJECT_NOT_FOUND);
        });
    });

    describe("PUT /api/project/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/project")
                .set("Authorization", `Bearer ${token}`)
                .send(projectsTestData);

            projectId = res.body.data._id;
        });

        it("updates project", async () => {
            const updatedData = { ...projectsTestData, title: "Updated Project Title" };

            const res = await request(app)
                .put(`/api/project/${projectId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(projectUpdateData);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.PROJECT_UPDATE_SUCCESS);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .put(`/api/project/${invalidId}`)
                .set("Authorization", `Bearer ${token}`)
                .send(projectUpdateData);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.PROJECT_NOT_FOUND);
        });
    });

    describe("DELETE /api/project/:id", () => {
        beforeEach(async () => {
            const res = await request(app)
                .post("/api/project")
                .set("Authorization", `Bearer ${token}`)
                .send(projectsTestData);

            projectId = res.body.data._id;
        });

        it("deletes project", async () => {
            const res = await request(app)
                .delete(`/api/project/${projectId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe(MESSAGES.PROJECT_DELETE_SUCCESS);
        });

        it("returns 404 for invalid ID", async () => {
            const res = await request(app)
                .delete(`/api/project/${invalidId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe(MESSAGES.PROJECT_NOT_FOUND);
        });
    });
});
