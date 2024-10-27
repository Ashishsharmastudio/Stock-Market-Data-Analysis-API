const express = require("express");
const router = express.Router();
const Joi = require("joi");
const stockController = require("../controllers/stockController");
const {
  validateQuery,
  dateRangeSchema,
} = require("../middleware/validateRequest");
const apiKeyAuth = require("../middleware/auth");

router.use(apiKeyAuth);

// Route for getting highest volume data
router.get(
  "/highest_volume",
  validateQuery(dateRangeSchema),
  stockController.getHighestVolume
);

// Route for getting average closing price
router.get(
  "/average_close",
  validateQuery(
    Joi.object({
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required(),
      symbol: Joi.string().required(),
    })
  ),
  stockController.getAverageClose
);

// Route for getting average VWAP
router.get(
  "/average_vwap",
  validateQuery(
    Joi.object({
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required(),
      symbol: Joi.string().optional(),
    })
  ),
  stockController.getAverageVWAP
);

// Route for getting all stocks with pagination
router.get(
  "/stocks",
  validateQuery(
    Joi.object({
      page: Joi.number().min(1).default(1),
      limit: Joi.number().min(1).max(100).default(10),
      symbol: Joi.string().optional(),
    })
  ),
  stockController.getAllStocks
);

// Route for getting stock statistics
router.get(
  "/statistics",
  validateQuery(
    Joi.object({
      symbol: Joi.string().required(),
      start_date: Joi.date().iso().required(),
      end_date: Joi.date().iso().required(),
    })
  ),
  stockController.getStockStatistics
);

module.exports = router;
