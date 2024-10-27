const Stock = require("../models/Stock");

class StockService {
  static async getHighestVolume(startDate, endDate, symbol) {
    const query = {};
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (symbol) {
      query.symbol = symbol;
    }

    const result = await Stock.findOne(query)
      .sort({ volume: -1 })
      .select("date symbol volume");

    return { highest_volume: result };
  }

  static async getAverageClose(startDate, endDate, symbol) {
    const query = { symbol };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const result = await Stock.aggregate([
      { $match: query },
      { $group: { _id: null, average_close: { $avg: "$close" } } },
    ]);

    return { average_close: result[0]?.average_close || 0 };
  }

  static async getAverageVWAP(startDate, endDate, symbol) {
    const query = {};
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }
    if (symbol) {
      query.symbol = symbol;
    }

    const result = await Stock.aggregate([
      { $match: query },
      { $group: { _id: null, average_vwap: { $avg: "$vwap" } } },
    ]);

    return { average_vwap: result[0]?.average_vwap || 0 };
  }

  static async getAllStocks(page = 1, limit = 10, symbol) {
    const query = symbol ? { symbol } : {};
    const skip = (page - 1) * limit;

    const [stocks, total] = await Promise.all([
      Stock.find(query).sort({ date: -1 }).skip(skip).limit(parseInt(limit)),
      Stock.countDocuments(query),
    ]);

    return {
      stocks,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(total / limit),
        total_records: total,
        records_per_page: parseInt(limit),
      },
    };
  }

  static async getStockStatistics(symbol, startDate, endDate) {
    const query = { symbol };
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const stats = await Stock.aggregate([
      { $match: query },
      {
        $group: {
          _id: null,
          avg_close: { $avg: "$close" },
          max_price: { $max: "$high" },
          min_price: { $min: "$low" },
          total_volume: { $sum: "$volume" },
          avg_trades: { $avg: "$trades" },
          avg_deliverable_percent: { $avg: "$percent_deliverable" },
        },
      },
    ]);

    return stats[0] || null;
  }
}

module.exports = StockService;
