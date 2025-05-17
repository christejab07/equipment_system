# Equipment Distribution System Backend

This is the backend API for the Equipment Distribution System, a web application for managing employee laptop assignments. The API handles user authentication (admin users) and employee laptop records, built with Node.js, Express, MySQL, and JWT authentication. It includes Swagger documentation for easy API exploration.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Swagger Documentation](#swagger-documentation)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Features

- **User Authentication**: Register and login admin users with JWT-based authentication.
- **Employee Management**: Create, retrieve, and manage employee laptop assignment records.
- **Pagination**: Fetch employee records with pagination support.
- **Validation**: Input validation using express-validator.
- **Swagger UI**: Interactive API documentation at /api-docs.
- **CORS**: Configured for frontend integration (e.g., React.js at http://localhost:3000).

## Prerequisites

- **Node.js**: v20.18.2 or higher
- **MySQL**: 8.0 or higher
- **npm**: 10.8.3 or higher
- **Git**: For cloning the repository
- **Postman** or similar tool (optional, for testing APIs)
- **Browser**: For accessing Swagger UI

## Installation

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd equipment-distribution-system
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   This installs required packages (express, mysql2, jsonwebtoken, swagger-jsdoc, etc.) as defined in package.json.

## Configuration

1. **Set Up MySQL Database:**

   Create a MySQL database named equipment_db:
   ```sql
   CREATE DATABASE equipment_db;
   ```

   Create the users table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

   Create the employee_laptops table:
   ```sql
   CREATE TABLE employee_laptops (
     id INT AUTO_INCREMENT PRIMARY KEY,
     firstname VARCHAR(255) NOT NULL,
     lastname VARCHAR(255) NOT NULL,
     national_identity VARCHAR(255) NOT NULL UNIQUE,
     telephone VARCHAR(20),
     email VARCHAR(255) UNIQUE,
     department VARCHAR(255),
     position VARCHAR(255),
     laptop_manufacturer VARCHAR(255),
     model VARCHAR(255),
     serial_number VARCHAR(255) UNIQUE,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

2. **Configure Environment Variables:**

   Create a `.env` file in the project root:
   ```
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=equipment_db
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

   Replace `your_mysql_user`, `your_mysql_password`, and `your_jwt_secret` with your credentials and a secure secret.

## Running the Server

1. **Start the Server:**
   ```bash
   npm start
   ```

   For development with auto-restart:
   ```bash
   npm run dev
   ```

   The server will run on http://localhost:5000. You'll see:
   ```
   Server running on port 5000
   Swagger UI available at http://localhost:5000/api-docs
   ```

## API Endpoints

All endpoints are prefixed with `/users` or `/employees`. Protected endpoints require a JWT in the Authorization header (`Bearer <token>`).

### Auth Endpoints

- **POST /users/register**
  - Register a new admin user.
  - Body: `{ "email": "admin@example.com", "password": "password123", "confirmPassword": "password123" }`
  - Response: `{ "message": "User created" }`

- **POST /users/login**
  - Login an admin user and receive a JWT.
  - Body: `{ "email": "admin@example.com", "password": "password123" }`
  - Response: `{ "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`

### User Endpoints (Protected)

- **GET /users/all**
  - Get all users.
  - Response: `[{ "id": 1, "email": "admin@example.com" }, ...]`

- **GET /users/:id**
  - Get a user by ID.
  - Example: `GET /users/1`
  - Response: `{ "id": 1, "email": "admin@example.com" }`

### Employee Endpoints (Protected)

- **POST /employees/create**
  - Create a new employee laptop record.
  - Body:
    ```json
    {
      "firstname": "Samanta",
      "lastname": "ISHIMWE",
      "national_identity": "12000710913307",
      "telephone": "0788888888",
      "email": "samanta@gmail.com",
      "department": "Human resource",
      "position": "Manager",
      "laptop_manufacturer": "HP",
      "model": "envy",
      "serial_number": "3400"
    }
    ```
  - Response: `{ "message": "Employee added" }`

- **GET /employees/all**
  - Get paginated employee records.
  - Query: `?page=1&limit=10`
  - Response:
    ```json
    {
      "employees": [
        {
          "id": 101,
          "firstname": "Samanta",
          "lastname": "ISHIMWE",
          ...
        },
        ...
      ],
      "total": 50,
      "page": 1,
      "pages": 5
    }
    ```

- **GET /employees/:id**
  - Get an employee by ID.
  - Example: `GET /employees/101`
  - Response:
    ```json
    {
      "id": 101,
      "firstname": "Samanta",
      "lastname": "ISHIMWE",
      ...
    }
    ```

## Swagger Documentation

- Access interactive API documentation at http://localhost:5000/api-docs.
- Endpoints are grouped under Auth, Users, and Employees.
- Use the Swagger UI to test APIs:
  1. Click an endpoint, then "Try it out".
  2. For protected endpoints, add the JWT in the Authorize button (Bearer <token>).

## Testing

### Using Swagger UI:
1. Open http://localhost:5000/api-docs.
2. Test POST /users/register and POST /users/login first to obtain a JWT.
3. Authorize with the JWT and test protected endpoints.

### Using Postman:
1. Import the Swagger spec from http://localhost:5000/api-docs.json.
2. Send requests with appropriate headers and bodies (see API Endpoints).

### Example Workflow:
1. **Register**: POST http://localhost:5000/users/register
   ```json
   {
     "email": "admin@example.com",
     "password": "password123",
     "confirmPassword": "password123"
   }
   ```

2. **Login**: POST http://localhost:5000/users/login
   ```json
   {
     "email": "admin@example.com",
     "password": "password123"
   }
   ```

3. **Create Employee**: POST http://localhost:5000/employees/create (with Authorization: Bearer <token>)
   ```json
   {
     "firstname": "Samanta",
     "lastname": "ISHIMWE",
     "national_identity": "12000710913307",
     "telephone": "0788888888",
     "email": "samanta@gmail.com",
     "department": "Human resource",
     "position": "Manager",
     "laptop_manufacturer": "HP",
     "model": "envy",
     "serial_number": "3400"
   }
   ```

4. **Get Employees**: GET http://localhost:5000/employees/all?page=1&limit=10 (with Authorization: Bearer <token>)

## Troubleshooting
### Database Errors:
- Verify MySQL is running and equipment_db exists.
- Check DB_HOST, DB_USER, DB_PASSWORD in .env.
### JWT Errors:
- Ensure JWT_SECRET is set in .env.
- Verify token format: `Authorization: Bearer <token>`.