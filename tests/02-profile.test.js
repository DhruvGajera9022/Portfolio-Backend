const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const path = require("path");
const { generateToken } = require("../src/config/jwt.config");
const { HTTP_STATUS } = require("../shared/constants");
const { createTestUser } = require("./helpers");
const { clearDB } = require("./testSetup");

require("./testSetup");

// Mock cloudinary
jest.mock("../src/utils/cloudinaryService.util.js", () => ({
    uploadFile: jest.fn().mockResolvedValue({ url: "http://fake.com/file.jpg" }),
}));

describe("Profile Controller", () => {
    let token, userId;

    beforeEach(async () => {
        await clearDB();
        const res = await createTestUser();
        token = res.token;
        userId = res.user.id;
    });

    describe("GET /api/profile", () => {
        it("fetches profile", async () => {
            const res = await request(app).get("/api/profile").set("Authorization", `Bearer ${token}`);
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
        });

        it("404 for missing user", async () => {
            const fakeToken = generateToken({ id: new mongoose.Types.ObjectId() });
            const res = await request(app).get("/api/profile").set("Authorization", `Bearer ${fakeToken}`);
            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
        });
    });

    describe("PUT /api/profile", () => {
        it("updates profile fields", async () => {
            const updates = { firstName: "John", lastName: "Doe" };
            const res = await request(app).put("/api/profile").set("Authorization", `Bearer ${token}`).send(updates);
            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.data.firstName).toBe("John");
        });

        it("updates avatar & resume", async () => {
            const avatarPath = path.join(__dirname, "files", "avatar.jpg");
            const resumePath = path.join(__dirname, "files", "resume.pdf");

            const res = await request(app)
                .put("/api/profile")
                .set("Authorization", `Bearer ${token}`)
                .attach("avatar", avatarPath)
                .attach("resume", resumePath);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.data.resume.fileName).toBe("resume.pdf");
        });
    });
});
