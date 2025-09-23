const request = require("supertest");
const app = require("../src/app");
const Contact = require("../src/models/Contact.model");
const { createTestUser } = require("./helpers");
const { clearDB } = require("./testSetup");
const { MESSAGES, HTTP_STATUS } = require("../shared/constants");

describe("Contact API", () => {
    let token;
    let contactId;

    beforeAll(async () => {
        const user = await createTestUser();
        token = user.token;
    });

    afterEach(async () => {
        await clearDB(); // Clean DB between tests
    });


    describe("POST /api/contact", () => {
        it("should create a new contact", async () => {
            const contactData = {
                name: "John Doe",
                email: "john@example.com",
                subject: "Test Subject",
                message: "Test message",
            };

            const res = await request(app)
                .post("/api/contact")
                .set("Authorization", `Bearer ${token}`)
                .send(contactData);

            expect(res.statusCode).toBe(HTTP_STATUS.CREATED);
            expect(res.body.data).toHaveProperty("_id");
            expect(res.body.data.name).toBe(contactData.name);

            contactId = res.body.data._id;
        });

        it("should fail when required fields are missing", async () => {
            const res = await request(app)
                .post("/api/contact")
                .set("Authorization", `Bearer ${token}`)
                .send({ name: "Missing email and message" });

            expect(res.statusCode).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR); // Depending on your error handler
            expect(res.body).toHaveProperty("message");
        });
    });

    describe("GET /api/contact", () => {
        it("should fetch all contact", async () => {
            // Create a contact first
            const contact = await Contact.create({
                name: "Jane Doe",
                email: "jane@example.com",
                subject: "Hello",
                message: "Hi there",
            });

            const res = await request(app)
                .get("/api/contact")
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.data.length).toBeGreaterThan(0);
        });
    });

    describe("GET /api/contact/:id", () => {
        it("should fetch a single contact by ID", async () => {
            const contact = await Contact.create({
                name: "Alice",
                email: "alice@example.com",
                subject: "Inquiry",
                message: "Hello",
            });

            const res = await request(app)
                .get(`/api/contact/${contact._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.data._id).toBe(contact._id.toString());
        });

        it("should return 404 if contact not found", async () => {
            const fakeId = "64f7c5df82a5d3b9f7fbc999";
            const res = await request(app)
                .get(`/api/contact/${fakeId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.message).toBe(MESSAGES.CONTACT_NOT_FOUND);
        });
    });

    describe("PUT /api/contact/:id", () => {
        it("should update a contact by ID", async () => {
            const contact = await Contact.create({
                name: "Bob",
                email: "bob@example.com",
                subject: "Old subject",
                message: "Old message",
            });

            const res = await request(app)
                .put(`/api/contact/${contact._id}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ subject: "Updated subject" });

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.data.subject).toBe("Updated subject");
        });

        it("should return 404 if contact not found", async () => {
            const fakeId = "64f7c5df82a5d3b9f7fbc999";
            const res = await request(app)
                .put(`/api/contact/${fakeId}`)
                .set("Authorization", `Bearer ${token}`)
                .send({ subject: "Updated subject" });

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.message).toBe(MESSAGES.CONTACT_NOT_FOUND);
        });
    });

    describe("DELETE /api/contact/:id", () => {
        it("should delete a contact by ID", async () => {
            const contact = await Contact.create({
                name: "Charlie",
                email: "charlie@example.com",
                subject: "Delete me",
                message: "Please delete",
            });

            const res = await request(app)
                .delete(`/api/contact/${contact._id}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.OK);
            expect(res.body.message).toBe(MESSAGES.CONTACT_DELETE_SUCCESS);
        });

        it("should return 404 if contact not found", async () => {
            const fakeId = "64f7c5df82a5d3b9f7fbc999";
            const res = await request(app)
                .delete(`/api/contact/${fakeId}`)
                .set("Authorization", `Bearer ${token}`);

            expect(res.statusCode).toBe(HTTP_STATUS.NOT_FOUND);
            expect(res.body.message).toBe(MESSAGES.CONTACT_NOT_FOUND);
        });
    });
});
