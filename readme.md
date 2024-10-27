# Stock Market API

A RESTful API for managing and analyzing stock market data from Nifty50.

## Features
- CSV data upload and validation
- Stock data analysis endpoints
- Authentication using API key
- Comprehensive error handling
- Unit and integration tests
- API documentation

## Tech Stack
- Node.js
- Express.js
- MongoDB
- Jest (Testing)
- Multer (File Upload)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/stock-market-api.git
cd stock-market-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configurations
```

4. Start MongoDB server

5. Run the application:
```bash
# Development
npm run dev

# Production
npm start
```

## Testing
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage
```

## API Documentation
See [API Documentation](docs/api-documentation.md) for detailed endpoint information.

## Deployment
1. Set up MongoDB Atlas cluster
2. Configure production environment variables
3. Deploy to your preferred hosting platform (Heroku, AWS, etc.)

## Directory Structure
```
stock-market-api/
├── src/               # Source code
├── tests/             # Test files
├── postman/           # Postman collection
├── docs/              # Documentation
├── uploads/           # Uploaded files
└── ...
```

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT
