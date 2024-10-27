const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./src/config/database");
const stockRoutes = require("./src/routes/stockRoutes");
const uploadRoutes = require("./src/routes/uploadRoutes");


dotenv.config();

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? ["https://yourdomain.com", "https://api.yourdomain.com"]
      : "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "x-api-key"],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  credentials: true,
  maxAge: 86400, // 24 hours
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", stockRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
