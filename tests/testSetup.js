const dotenv = require("dotenv");
dotenv.config({ path: ".env.test" });

const mongoose = require("mongoose");

jest.setTimeout(30000);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

// Helper to clear DB between test groups
const clearDB = async () => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
};

module.exports = { clearDB };
