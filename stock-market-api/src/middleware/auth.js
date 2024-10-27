const { errorResponse } = require("../utils/response");

const apiKeyAuth = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return errorResponse(res, "Unauthorized - Invalid API Key", 401);
  }

  next();
};

module.exports = apiKeyAuth;
