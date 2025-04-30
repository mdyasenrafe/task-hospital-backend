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

### Directory Structure Explanation

#### 1. `src/app/modules/`
Each module represents a distinct feature of the application and follows a consistent structure:
- **Controller**: Handles HTTP requests and responses
- **Service**: Contains business logic
- **Validation**: Request validation schemas
- **Route**: Defines API endpoints for the module

Example of a module structure (auth):
```typescript
// auth.controller.ts
export class AuthController {
  async login(req: Request, res: Response) {
    // Handle login request
  }
  async register(req: Request, res: Response) {
    // Handle registration
  }
}

// auth.service.ts
export class AuthService {
  async validateUser(email: string, password: string) {
    // User validation logic
  }
  async createUser(userData: UserCreate) {
    // User creation logic
  }
}
```

#### 2. `src/app/routes/`
Centralizes all route definitions and versioning:
```typescript
// routes/v1/index.ts
import { Router } from 'express';
import authRoutes from '../../modules/auth/auth.route';
import bookingRoutes from '../../modules/booking/booking.route';

const router = Router();

router.use('/auth', authRoutes);
router.use('/bookings', bookingRoutes);

export default router;
```

#### 3. `src/app/middlewares/`
Contains custom middleware functions:
- **auth.middleware.ts**: JWT authentication
- **error.middleware.ts**: Global error handling
- **validate.middleware.ts**: Request validation

Example middleware:
```typescript
// auth.middleware.ts
export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new ApiError(401, 'No token provided');
    // Token verification logic
    next();
  } catch (error) {
    next(error);
  }
};
```

#### 4. `src/app/utils/`
Utility functions used across the application:
- JWT handling
- Password hashing
- Response formatting
- Date manipulation
- Common helpers

#### 5. `src/app/types/`
TypeScript type definitions:
```typescript
// models.types.ts
export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

export interface Booking {
  id: string;
  userId: string;
  hospitalId: string;
  serviceId: string;
  status: BookingStatus;
  appointmentDate: Date;
}
```

#### 6. `src/app/errors/`
Custom error classes for better error handling:
```typescript
// ApiError.ts
export class ApiError extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

#### 7. `src/config/`
Configuration files:
- Database connection settings
- Environment variables
- Third-party service configurations
- Application constants

### Key Design Principles

1. **Modularity**: Each feature is self-contained in its own module
2. **Single Responsibility**: Each file has a single, well-defined purpose
3. **Dependency Injection**: Services are injected where needed
4. **Type Safety**: Comprehensive TypeScript types for better development experience
5. **Error Handling**: Centralized error handling with custom error classes
6. **Middleware Pattern**: Common functionalities are implemented as middleware
7. **Configuration Management**: Environment-based configuration

### Best Practices

1. **Code Organization**
   - Related code is grouped together in modules
   - Clear separation between routes, controllers, and services
   - Consistent file naming conventions

2. **Error Handling**
   - Custom error classes for different types of errors
   - Global error handling middleware
   - Proper error logging

3. **Security**
   - Authentication middleware
   - Input validation
   - Password hashing
   - JWT token management

4. **Scalability**
   - Modular architecture allows easy addition of new features
   - API versioning support
   - Environment-based configuration

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
2. **Validation**: All input data is validated using Zod Validator
3. **Error Handling**: The API returns consistent error responses with appropriate HTTP status codes

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

#### Live Deployment

Visit the live server at [live server](https://task-hospital.vercel.app/). The [live version](https://task-hospital.vercel.app/) supports all the operations described above.

Testing with Postman
To test these APIs, you can use Postman:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/23250497-72dfb695-9f8a-4408-8ed9-30e8a25a9053?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D23250497-72dfb695-9f8a-4408-8ed9-30e8a25a9053%26entityType%3Dcollection%26workspaceId%3D26545fbb-51aa-48f2-b7b0-b77dc36dc3fd)