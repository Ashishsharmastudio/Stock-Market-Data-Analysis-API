const csvService = require("../services/csvService");
const { successResponse, errorResponse } = require("../utils/response");

exports.uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return errorResponse(res, "No file uploaded", 400);
    }

    const result = await csvService.processCSV(req.file.path);
    return successResponse(res, {
      message: "File processed successfully",
      ...result,
    });
  } catch (error) {
    return errorResponse(res, error.message);
  }
};
