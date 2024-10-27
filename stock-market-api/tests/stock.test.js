const request = require("supertest");
const app = require("../src/app");
const Stock = require("../src/models/Stock");
const mongoose = require("mongoose");

describe("Stock API Tests", () => {
  beforeAll(async () => {
    // Connect to test database
    await mongoose.connect(process.env.MONGODB_URI_TEST);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });

  describe("Upload Endpoint", () => {
    it("should upload CSV file successfully", async () => {
      const response = await request(app)
        .post("/upload")
        .attach("file", "./tests/fixtures/test.csv");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe("Stock Data Endpoints", () => {
    it("should get highest volume", async () => {
      const response = await request(app).get("/api/highest_volume").query({
        start_date: "2024-01-01",
        end_date: "2024-12-31",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});
