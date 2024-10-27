const csvService = require("../../src/services/csvService");
const fs = require("fs");
const path = require("path");

describe("CSV Service", () => {
  const testFilePath = path.join(__dirname, "../fixtures/test.csv");

  test("processes valid CSV file successfully", async () => {
    const result = await csvService.processCSV(testFilePath);
    expect(result.successfulRecords).toBeGreaterThan(0);
    expect(result.failedRecords).toBe(0);
  });

  test("handles invalid CSV data appropriately", async () => {
    const invalidFilePath = path.join(__dirname, "../fixtures/invalid.csv");
    fs.writeFileSync(invalidFilePath, "invalid,data\n1,two");

    const result = await csvService.processCSV(invalidFilePath);
    expect(result.failedRecords).toBeGreaterThan(0);

    fs.unlinkSync(invalidFilePath);
  });
});
