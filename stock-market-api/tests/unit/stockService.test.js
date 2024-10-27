const stockService = require("../../src/services/stockService");
const Stock = require("../../src/models/Stock");

describe("Stock Service", () => {
  beforeEach(async () => {
    await Stock.deleteMany({});
  });

  test("getHighestVolume returns correct record", async () => {
    await Stock.create([
      { date: "2024-01-01", symbol: "TEST", volume: 1000 },
      { date: "2024-01-02", symbol: "TEST", volume: 2000 },
    ]);

    const result = await stockService.getHighestVolume(
      "2024-01-01",
      "2024-01-31",
      "TEST"
    );
    expect(result.volume).toBe(2000);
  });

  test("getAverageClose calculates correctly", async () => {
    await Stock.create([
      { date: "2024-01-01", symbol: "TEST", close: 100 },
      { date: "2024-01-02", symbol: "TEST", close: 200 },
    ]);

    const result = await stockService.getAverageClose(
      "2024-01-01",
      "2024-01-31",
      "TEST"
    );
    expect(result.average_close).toBe(150);
  });
});
