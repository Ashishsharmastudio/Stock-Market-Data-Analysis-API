const request = require("supertest");
const app = require("../../../app");
const Stock = require("../../src/models/Stock");

describe("API Integration", () => {
  beforeEach(async () => {
    await Stock.deleteMany({});
  });

  test("GET /api/stocks returns paginated results", async () => {
    await Stock.create([
      { date: "2024-01-01", symbol: "TEST", volume: 1000 },
      { date: "2024-01-02", symbol: "TEST", volume: 2000 },
    ]);

    const response = await request(app)
      .get("/api/stocks")
      .set("x-api-key", process.env.API_KEY)
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body.data.stocks).toHaveLength(2);
    expect(response.body.data.pagination).toBeDefined();
  });

  test("POST /upload handles CSV upload", async () => {
    const response = await request(app)
      .post("/upload")
      .set("x-api-key", process.env.API_KEY)
      .attach("file", "tests/fixtures/test.csv");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
