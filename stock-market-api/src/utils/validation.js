const validateStockData = (data) => {
  const numericFields = [
    "Prev Close",
    "Open",
    "High",
    "Low",
    "Last",
    "Close",
    "VWAP",
    "Volume",
    "Turnover",
    "Trades",
    "Deliverable Volume",
    "%Deliverble",
  ];

  // Validate date
  const date = new Date(data.Date);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format");
  }

  // Validate numeric fields
  numericFields.forEach((field) => {
    const value = parseFloat(data[field]);
    if (isNaN(value) && field !== "Trades") {
      // Trades can be empty
      throw new Error(`Invalid numeric value for ${field}`);
    }
  });

  return {
    date,
    symbol: data.Symbol,
    series: data.Series,
    prev_close: parseFloat(data["Prev Close"]),
    open: parseFloat(data.Open),
    high: parseFloat(data.High),
    low: parseFloat(data.Low),
    last: parseFloat(data.Last),
    close: parseFloat(data.Close),
    vwap: parseFloat(data.VWAP),
    volume: parseInt(data.Volume),
    turnover: parseFloat(data.Turnover),
    trades: data.Trades ? parseInt(data.Trades) : 0,
    deliverable: parseInt(data["Deliverable Volume"]),
    percent_deliverable: parseFloat(data["%Deliverble"]),
  };
};

module.exports = validateStockData;
