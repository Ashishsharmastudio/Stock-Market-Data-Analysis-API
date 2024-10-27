const csv = require("csv-parser");
const fs = require("fs");
const Stock = require("../models/Stock");
// const { validateStockData } = require("../utils/validation");
const validateStockData = require("../utils/validation");


exports.processCSV = async (filePath) => {
  const results = {
    totalRecords: 0,
    successfulRecords: 0,
    failedRecords: 0,
    errors: [],
  };

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (data) => {
        results.totalRecords++;
        try {
          const validatedData = validateStockData(data);
          await Stock.create(validatedData);
          results.successfulRecords++;
        } catch (error) {
          results.failedRecords++;
          results.errors.push({
            row: results.totalRecords,
            error: error.message,
          });
        }
      })
      .on("end", () => {
        fs.unlinkSync(filePath); // Clean up uploaded file
        resolve(results);
      })
      .on("error", (error) => reject(error));
  });
};
