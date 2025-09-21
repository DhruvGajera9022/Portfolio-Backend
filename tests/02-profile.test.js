const request = require("supertest");
const app = require("../src/app");
const mongoose = require("mongoose");
const path = require("path");
const { generateToken } = require("../src/config/jwt.config");
const { testUserRegister, userData } = require("../shared/constants/test.constants");
const { HTTP_STATUS } = require("../shared/constants");

require("./testSetup");

jest.mock("../src/utils/cloudinaryService.util.js", () => ({
    uploadFile: jest.fn().mockResolvedValue({ url: "http://fake.com/file.jpg" }),
}));


describe("Profile Controller", () => {
    let token;
    let userId;

    beforeAll(async () => {
        // Clear database and register test user
        const collections = await mongoose.connection.db.collections();
        for (let collection of collections) await collection.deleteMany({});

        const res = await request(app)
            .post("/api/auth/register")
            .send(testUserRegister);

        token = res.body?.data?.token;
        userId = res.body?.data?.user?.id;

        if (!token || !userId) throw new Error("Failed to register test user");
    });

    /**
     * GET /api/profile
     */
    describe("GET /api/profile", () => {
        it("should fetch profile successfully", async () => {
            const res = await request(app)
                .get("/api/profile")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data.email).toBe(testUserRegister.email);
            expect(res.body.data).not.toHaveProperty("password");
        });

        it("should return 404 if user not found", async () => {
            const fakeToken = generateToken({ id: new mongoose.Types.ObjectId() });

            const res = await request(app)
                .get("/api/profile")
                .set("Authorization", `Bearer ${fakeToken}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.message).toBe("User not found");
        });

        it("should return 401 if no token provided", async () => {
            const res = await request(app).get("/api/profile");
            expect(res.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
        });
    });

    /**
     * PUT /api/profile
     */
    describe("PUT /api/profile", () => {
        it("should update profile fields successfully", async () => {
            const updates = {
                firstName: "John",
                lastName: "Doe",
                phone: "1234567890",
                location: {
                    city: "abc",
                    state: "def",
                    country: "ghi"
                },
                title: "Developer",
                bio: "This is developer bio"
            };

            const res = await request(app)
                .put("/api/profile")
                .set("Authorization", `Bearer ${token}`)
                .send(updates);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data.firstName).toBe(updates.firstName);
            expect(res.body.data.lastName).toBe(updates.lastName);
            expect(res.body.data.phone).toBe(updates.phone);
            expect(res.body.data.location).toStrictEqual(updates.location);
            expect(res.body.data.title).toBe(updates.title);
            expect(res.body.data.bio).toBe(updates.bio);
            expect(res.body.data.socialLinks).toEqual(updates.socialLinks);
            expect(res.body.data).not.toHaveProperty("password");
        });

        it("should update avatar and resume successfully", async () => {
            const avatarPath = path.join(__dirname, "files", "avatar.jpg");
            const resumePath = path.join(__dirname, "files", "resume.pdf");

            const res = await request(app)
                .put("/api/profile")
                .set("Authorization", `Bearer ${token}`)
                .attach("avatar", avatarPath)
                .attach("resume", resumePath);


            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body).toHaveProperty("data");
            expect(res.body.data).toHaveProperty("avatar");
            expect(res.body.data).toHaveProperty("resume");
            expect(res.body.data.resume).toHaveProperty("fileName", "resume.pdf");
        });

        it("should return 400 if no valid fields provided", async () => {
            const res = await request(app)
                .put("/api/profile")
                .set("Authorization", `Bearer ${token}`)
                .send({ invalidField: "test" });

            expect(res.statusCode).toBe(HTTP_STATUS.BAD_REQUEST);
            expect(res.body).toHaveProperty("message", "Validation error");
        });

        it("should return 404 if user not found", async () => {
            const fakeToken = generateToken({ id: new mongoose.Types.ObjectId() });

            const res = await request(app)
                .put("/api/profile")
                .set("Authorization", `Bearer ${fakeToken}`)
                .send({ firstName: "NewName" });

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body).toHaveProperty("message");
        });

        it("should return 401 if no token provided", async () => {
            const res = await request(app)
                .put("/api/profile")
                .send({ firstName: "NewName" });

            expect(res.statusCode).toBe(HTTP_STATUS.UNAUTHORIZED);
        });
    });
});
