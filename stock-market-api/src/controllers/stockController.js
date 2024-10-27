const StockService = require("../services/stockService");
const { successResponse, errorResponse } = require("../utils/response");

class StockController {
  static async getHighestVolume(req, res) {
    try {
      const { start_date, end_date, symbol } = req.query;
      const result = await StockService.getHighestVolume(
        start_date,
        end_date,
        symbol
      );
      return successResponse(res, { highest_volume: result });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  

  static async getAverageClose(req, res) {
    try {
      const { start_date, end_date, symbol } = req.query;
      const result = await StockService.getAverageClose(
        start_date,
        end_date,
        symbol
      );
      return successResponse(res, { average_close: result });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  static async getAverageVWAP(req, res) {
    try {
      const { start_date, end_date, symbol } = req.query;
      const result = await StockService.getAverageVWAP(
        start_date,
        end_date,
        symbol
      );
      return successResponse(res, { average_vwap: result });
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  static async getAllStocks(req, res) {
    try {
      const { page, limit, symbol } = req.query;
      const stocks = await StockService.getAllStocks(page, limit, symbol);
      return successResponse(res, stocks);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }

  static async getStockStatistics(req, res) {
    try {
      const { symbol, start_date, end_date } = req.query;
      const stats = await StockService.getStockStatistics(
        symbol,
        start_date,
        end_date
      );
      return successResponse(res, stats);
    } catch (error) {
      return errorResponse(res, error.message);
    }
  }
}

module.exports = StockController;
