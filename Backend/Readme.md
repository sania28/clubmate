# ClubMate Backend API

## Overview

ClubMate Backend is a RESTful API service built for blogging platform management with secure user authentication and dashboard functionality. The backend provides JWT-based authentication using HTTP-only cookies and user management capabilities.

## Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js v5.1.0
- **Database**: MongoDB with Mongoose ODM v8.16.5
- **Authentication**: JWT (JSON Web Tokens) v9.0.2
- **Security**: bcrypt v6.0.0 for password hashing
- **Cookie Management**: cookie-parser v1.4.7
- **Environment**: dotenv v17.2.1

## Project Structure

```
Backend/
├── app.js                      # Express application setup
├── server.js                   # HTTP server initialization
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables
├── controllers/                # Business logic handlers
│   ├── auth.controller.js      # Authentication logic
│   └── dashBoard.controller.js # Dashboard operations
├── routes/                     # API route definitions
│   ├── auth.route.js          # Authentication routes
│   └── dashboard.route.js     # Dashboard routes
├── middleware/                 # Middleware functions
│   ├── auth.middleware.js     # Input validation
│   └── jwtverification.middleware.js # JWT verification
├── modals/                     # Database schemas
│   └── user.modal.js          # User model
├── service/                    # Utility services
│   ├── jwtTokenGenerate.js    # JWT token generation
│   └── hashPassword.js        # Password hashing utilities
└── DB/                        # Database configuration
    └── database.connection.js  # MongoDB connection
```

## Security Implementation

### Authentication System

- **JWT Token-based authentication** with HTTP-only cookies
- **Password encryption** using bcrypt with salt rounds (10)
- **Token expiration** (1 hour)
- **Secure cookie storage** (24 hours max age)

### Password Security

- **Minimum requirements**: Enforced at application level
- **Salt rounds**: 10 for bcrypt hashing
- **Password comparison**: Secure bcrypt comparison

### Data Protection

- **Input validation** middleware for all endpoints
- **User existence verification** before operations
- **Duplicate email prevention** during registration
- **Cookie-based token storage** for security

## Database Schema

### User Model

```javascript
{
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  timestamps: true // createdAt, updatedAt
}
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/signup

**Purpose**: User registration with password hashing
**Input**:

```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)"
}
```

**Success Response** (201):

```json
{
  "_id": "64f7b1c2e8a9c12345678901",
  "name": "John Doe",
  "email": "john@example.com",
  "password": " ", // Hidden for security
  "createdAt": "2023-09-05T10:30:00Z",
  "updatedAt": "2023-09-05T10:30:00Z"
}
```

**Error Responses**:

- **404**: Missing required fields

```json
{
  "msg": "All Fields are required"
}
```

- **409**: User already exists

```json
{
  "msg": "User already exist"
}
```

- **500**: Server error

```json
{
  "error": "Internal server error details"
}
```

#### POST /api/auth/login

**Purpose**: User authentication with JWT token generation
**Input**:

```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Success Response** (201):

```json
{
  "msg": "Login is Sucessfull"
}
```

**Note**: JWT token is set as HTTP-only cookie named 'token'

**Error Responses**:

- **404**: Missing fields

```json
{
  "mag": "All fields are require"
}
```

- **404**: User not found

```json
{
  "msg": "User Not Found"
}
```

- **404**: Invalid password

```json
{
  "msg": "Invalid Password"
}
```

- **500**: Server error

#### GET /api/auth/logout

**Purpose**: User logout with token invalidation
**Authentication**: Required (JWT token in cookies)
**Headers**: Cookie with valid JWT token

**Success Response** (201):

```json
{
  "msg": "Logout was sucessfull"
}
```

**Error Responses**:

- **404**: No token provided

```json
{
  "msg": "User must be login"
}
```

- **401**: Invalid token

```json
{
  "msg": "Invalid User"
}
```

### Dashboard Endpoints

#### GET /api/dashboard/mypost/:id

**Purpose**: Retrieve user's posts by ID
**Authentication**: Required (JWT token in cookies)
**URL Parameters**:

- `id`: MongoDB ObjectId of the user

**Success Response** (201):

```json
{
  "msg": "All post"
}
```

**Error Responses**:

- **404**: Authentication required

```json
{
  "msg": "User must be login"
}
```

- **401**: Invalid token

```json
{
  "msg": "Invalid User"
}
```

## Middleware Functions

### Authentication Middleware

#### RegisterValidation

**Purpose**: Validates registration input and checks for existing users
**Validations**:

- Required fields: name, email, password
- Email uniqueness check
- Database query for existing user

#### LoginValidation

**Purpose**: Validates login credentials and verifies user existence
**Validations**:

- Required fields: email, password
- User existence verification
- Attaches user object to request

#### jwtValidation

**Purpose**: Verifies JWT token from cookies
**Process**:

1. Extracts token from cookies
2. Verifies token with secret key
3. Allows access if valid

## Service Functions

### JWT Token Generation

**File**: `service/jwtTokenGenerate.js`
**Function**: `handleGenerateToken(name, email)`
**Returns**: JWT token with 1-hour expiration
**Payload**: User name and email

### Password Hashing

**File**: `service/hashPassword.js`
**Functions**:

- `handleHashPassword(password)`: Hashes password with bcrypt
- `handleDecordPassword(hashpassword, password)`: Compares passwords

## Environment Configuration

### Required Environment Variables

```properties
PORT=3000
MONGODB_URL=mongodb://localhost:27017/Blogging-platform
SECRET_KEY=clubmate@1234
```

### Environment Setup

1. Create `.env` file in root directory
2. Set appropriate values for your environment
3. Ensure MongoDB is running on specified URL
4. Use strong secret key for JWT signing

## Installation and Setup

### Prerequisites

- Node.js (v14.0.0 or higher)
- MongoDB (v4.0 or higher)
- npm package manager

### Installation Steps

1. **Clone and Navigate**:

```bash
cd c:\Users\paula\OneDrive\Desktop\CLUEMATE\clubmate\Backend
```

2. **Install Dependencies**:

```bash
npm install
```

3. **Environment Setup**:

```bash
# Copy and configure .env file
cp .env.example .env
# Edit .env with your configuration
```

4. **Start MongoDB**:

```bash
# Ensure MongoDB is running
mongod
```

5. **Start Server**:

```bash
npm start
# Server runs on http://localhost:3000
```

## API Usage Examples

### User Registration

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### User Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### Access Protected Route

```bash
curl -X GET http://localhost:3000/api/dashboard/mypost/64f7b1c2e8a9c12345678901 \
  -b cookies.txt
```

### Logout

```bash
curl -X GET http://localhost:3000/api/auth/logout \
  -b cookies.txt
```

## Security Features

### Input Validation

- **Required field validation** for all endpoints
- **Email format validation** through Mongoose schema
- **Duplicate prevention** for user registration
- **User existence verification** for login

### Authentication Security

- **JWT tokens** stored in HTTP-only cookies
- **Password hashing** with bcrypt salt rounds
- **Token expiration** (1 hour for JWT, 24 hours for cookie)
- **Secure cookie settings** with maxAge

### Data Protection

- **Password hiding** in API responses
- **Database connection security** with environment variables
- **Error handling** to prevent information leakage

## Error Handling

### Common Error Patterns

- **404**: Resource not found or missing data
- **401**: Authentication failure
- **500**: Internal server errors with detailed logging

### Error Response Format

```json
{
  "msg": "Human-readable error message"
}
```

or

```json
{
  "error": "Detailed error object for 500 errors"
}
```

## Development Notes

### Known Issues

1. `user.insertOne()` should be `user.create()` for Mongoose
2. Dashboard endpoint needs proper post model implementation
3. JWT verification error handling could be improved
4. Input validation could be more comprehensive

### Recommended Improvements

1. Add request rate limiting
2. Implement refresh token mechanism
3. Add comprehensive input validation (email format, password strength)
4. Add logging middleware
5. Implement proper error handling middleware
6. Add API documentation with Swagger
7. Add unit and integration tests

## Testing

### Manual Testing

Use tools like Postman or curl to test endpoints:

1. Register a new user
2. Login with credentials
3. Access protected dashboard route
4. Logout to clear session

### Health Check

Server status can be verified by checking console output:

```
Database is connected
Server was running at 3000
```

## Support and Maintenance

### Monitoring

- Server logs available in console
- Database connection status logged
- Error details logged for debugging

### Backup Recommendations

- Regular MongoDB database backups
- Environment file backup
- Source code version control

## Production Considerations

### Security Enhancements Needed

- HTTPS implementation
- CORS configuration
- Rate limiting
- Input sanitization
- SQL injection prevention
- XSS protection headers

### Performance Optimizations

- Database indexing
- Connection pooling
- Caching mechanisms
- Load balancing preparation

---

**Current Version**: 1.0.0  
**Last Updated**: September 2023  
**Database**: Blogging-platform  
**Default Port**: 3000
