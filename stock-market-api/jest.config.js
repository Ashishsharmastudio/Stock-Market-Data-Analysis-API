module.exports = {
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.js"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/config/",
    "/tests/fixtures/",
  ],
  setupFiles: ["dotenv/config"],
  verbose: true,
};
