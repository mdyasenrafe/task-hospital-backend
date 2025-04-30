# Hospital Booking System Backend

A robust backend system for a hospital booking application built with Node.js, Express, and TypeScript. This system provides APIs for user authentication, hospital services management, and appointment booking.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Important Notes](#important-notes)

## Features
- User Authentication (Email/Password)
- Hospital Services Management
- Appointment Booking System
- Error Handling & Validation
- TypeScript Support
- API Documentation

## Tech Stack
- Node.js
- Express.js
- TypeScript
- MongoDB (Database)
- JWT for Authentication
- Express Validator for input validation
- Other dependencies (as listed in package.json)

## Project Structure
```
hospital-backend/
├── src/
│   ├── app/
│   │   ├── modules/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── types/
│   │   └── errors/
│   ├── config/
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hospital-backend.git
cd hospital-backend
```

2. Install dependencies
```bash
yarn install
```

3. Set up environment variables (create .env file)
```bash
cp .env.example .env
```

4. Start the development server
```bash
yarn dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## API Documentation

### Base URL
```
http://localhost:5000/api/
```

### Available Endpoints

| Method | Endpoint                    | Description                    | Auth Required |
|--------|----------------------------|--------------------------------|--------------|
| POST   | /auth/register             | Register new user              | No           |
| POST   | /auth/login                | User login                     | No           |
| GET    | /hospitals                 | Get all hospitals              | Yes          |
| GET    | /hospitals/:id             | Get hospital details           | Yes          |
| GET    | /services                  | Get all services              | Yes          |
| POST   | /appointments              | Create new appointment         | Yes          |
| GET    | /appointments              | Get user appointments          | Yes          |

### API Request & Response Examples

#### User Registration
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Book Appointment
```http
POST /api/v1/appointments
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "hospitalId": "hospital_id",
  "serviceId": "service_id",
  "date": "2024-04-25",
  "time": "10:00"
}
```

Response:
```json
{
  "success": true,
  "message": "Appointment booked successfully",
  "data": {
    "id": "appointment_id",
    "hospital": "Hospital Name",
    "service": "Service Name",
    "date": "2024-04-25",
    "time": "10:00",
    "status": "confirmed"
  }
}
```

## Important Notes

1. **Authentication**: All protected routes require a JWT token in the Authorization header
2. **Rate Limiting**: API requests are limited to 100 requests per 15 minutes per IP
3. **Validation**: All input data is validated using Express Validator
4. **Error Handling**: The API returns consistent error responses with appropriate HTTP status codes
5. **Documentation**: API documentation is available at `/api-docs` when running in development mode

## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error

Error Response Format:
```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Optional array of detailed errors
}
```

## Development

To run the project in development mode with hot-reloading:
```bash
yarn dev
```

For production build:
```bash
yarn build
yarn start
```

## Testing

Run tests using:
```bash
yarn test
```



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details