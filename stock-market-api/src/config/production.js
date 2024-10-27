module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI,
  apiKey: process.env.API_KEY,
  corsOrigins: process.env.CORS_ORIGINS?.split(",") || ["*"],
  uploadLimit: process.env.UPLOAD_LIMIT || "5mb",
  nodeEnv: process.env.NODE_ENV || "production",
};
