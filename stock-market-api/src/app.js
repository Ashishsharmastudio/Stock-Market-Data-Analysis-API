const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/database");
const stockRoutes = require("./routes/stockRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
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
