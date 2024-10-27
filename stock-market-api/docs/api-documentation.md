# Stock Market API Documentation

## Overview
This API provides endpoints for managing and analyzing stock market data from the Nifty50 dataset.

## Base URL
`http://localhost:3000`

## Authentication
All endpoints require an API key in the header:
```
x-api-key: 22fe7b8e51958e3a19b938b3aac89a17c8b51b03faaa0bffc6d1a44b4e704dbf
```

## Endpoints

### 1. Upload Stock Data
- **Method**: POST
- **Endpoint**: `/upload`
- **Purpose**: Upload and process CSV stock data
- **Headers**: 
  - `x-api-key`
  - `Content-Type: multipart/form-data`
- **Body**: CSV file
- **Response**:
  ```json
  {
      "success": true,
      "data": {
          "totalRecords": 3322,
          "successfulRecords": 3322,
          "failedRecords": 0,
          "errors": []
      }
  }
  ```

### 2. Get Highest Volume
- **Method**: GET
- **Endpoint**: `/api/highest_volume`
- **Purpose**: Retrieve stock record(s) with highest trading volume
- **Query Parameters**:
  - `start_date` (YYYY-MM-DD) - Required
  - `end_date` (YYYY-MM-DD) - Required
  - `symbol` (String) - Optional
- **Response**:
  ```json
  {
      "success": true,
      "data": {
          "date": "2007-11-27",
          "symbol": "MUNDRAPORT",
          "volume": 27294366,
          "high": 1050,
          "low": 770,
          "close": 962.9
      }
  }
  ```

### 3. Get Average Close Price
- **Method**: GET
- **Endpoint**: `/api/average_close`
- **Purpose**: Calculate average closing price for a stock
- **Query Parameters**:
  - `start_date` (YYYY-MM-DD) - Required
  - `end_date` (YYYY-MM-DD) - Required
  - `symbol` (String) - Required
- **Response**:
  ```json
  {
      "success": true,
      "data": {
          "symbol": "MUNDRAPORT",
          "average_close": 1074.95,
          "period": {
              "start": "2007-11-27",
              "end": "2007-12-28"
          }
      }
  }
  ```

### 4. Get Average VWAP
- **Method**: GET
- **Endpoint**: `/api/average_vwap`
- **Purpose**: Calculate average VWAP (Volume Weighted Average Price)
- **Query Parameters**:
  - `start_date` (YYYY-MM-DD) - Required
  - `end_date` (YYYY-MM-DD) - Required
  - `symbol` (String) - Optional
- **Response**:
  ```json
  {
      "success": true,
      "data": {
          "symbol": "MUNDRAPORT",
          "average_vwap": 1082.93,
          "period": {
              "start": "2007-11-27",
              "end": "2007-12-28"
          }
      }
  }
  ```

### 5. Get Stock List
- **Method**: GET
- **Endpoint**: `/api/stocks`
- **Purpose**: Retrieve paginated list of stock records
- **Query Parameters**:
  - `page` (Number) - Default: 1
  - `limit` (Number) - Default: 10, Max: 100
  - `symbol` (String) - Optional
- **Response**:
  ```json
  {
      "success": true,
      "data": {
          "stocks": [
              {
                  "date": "2007-11-27",
                  "symbol": "MUNDRAPORT",
                  "open": 770,
                  "high": 1050,
                  "low": 770,
                  "close": 962.9,
                  "volume": 27294366
              }
          ],
          "pagination": {
              "currentPage": 1,
              "totalPages": 333,
              "totalRecords": 3322,
              "hasNext": true,
              "hasPrev": false
          }
      }
  }
  ```

### 6. Get Stock Statistics
- **Method**: GET
- **Endpoint**: `/api/statistics`
- **Purpose**: Get comprehensive statistics for a stock
- **Query Parameters**:
  - `start_date` (YYYY-MM-DD) - Required
  - `end_date` (YYYY-MM-DD) - Required
  - `symbol` (String) - Required
- **Response**:
  ```json
  {
      "success": true,
      "data": {
          "symbol": "MUNDRAPORT",
          "period": {
              "start": "2007-11-27",
              "end": "2007-12-28"
          },
          "statistics": {
              "average_close": 1074.95,
              "highest_price": 1274,
              "lowest_price": 770,
              "total_volume": 27294366,
              "average_vwap": 1082.93,
              "price_change_percent": 29.73
          }
      }
  }
  ```

## Error Responses
All endpoints return error responses in the following format:
```json
{
    "success": false,
    "error": {
        "message": "Error description",
        "code": "ERROR_CODE"
    }
}
```

### Common Error Codes
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error
