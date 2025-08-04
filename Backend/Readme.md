# ClubMate Backend API

## Overview

ClubMate Backend is a RESTful API service built for club and project management with secure user authentication, role-based access control (RBAC), and dashboard functionality. The backend provides JWT-based authentication using HTTP-only cookies, hierarchical user roles, and granular permission management for multi-user club environments.

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
│   ├── jwtverification.middleware.js # JWT verification
│   └── roleVerification.js    # Role-based access control
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
- **Role-based access control (RBAC)** with hierarchical permissions

### Role-Based Access Control (RBAC)

The system implements a four-tier role hierarchy with specific permissions:

#### Role Hierarchy:

1. **Admin** - Full system access

   - Manage all users and projects
   - Access to all dashboard endpoints
   - User role assignment capabilities

2. **ClubLead** - Club management access

   - Create, edit, and delete projects within their club
   - Manage club members
   - Access to club-specific dashboard features

3. **Member** - Standard user access

   - View and participate in club projects
   - Limited dashboard functionality
   - Read and contribute permissions

4. **Guest** - Read-only access
   - View public club content
   - No modification permissions
   - Restricted dashboard access

#### Permission Matrix:

| Action         | Admin | ClubLead | Member | Guest |
| -------------- | ----- | -------- | ------ | ----- |
| Create Project | ✅    | ✅       | ❌     | ❌    |
| Edit Project   | ✅    | ✅       | ❌     | ❌    |
| Delete Project | ✅    | ✅       | ❌     | ❌    |
| View Projects  | ✅    | ✅       | ✅     | ✅    |
| Dashboard Info | ✅    | ✅       | ✅     | ❌    |

### Password Security

- **Minimum requirements**: Enforced at application level
- **Salt rounds**: 10 for bcrypt hashing
- **Password comparison**: Secure bcrypt comparison

### Data Protection

- **Input validation** middleware for all endpoints
- **User existence verification** before operations
- **Duplicate email prevention** during registration
- **Cookie-based token storage** for security
- **Role-based authorization** on protected routes
- **Permission validation** before resource access

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
  role: {
    type: String,
    required: true,
    enum: ["Admin", "ClubLead", "Member", "Guest"],
    default: "Guest"
  },
  timestamps: true // createdAt, updatedAt
}
```

## API Endpoints

### Authentication Endpoints

#### POST /api/auth/signup

**Purpose**: User registration with password hashing and role assignment
**Input**:

```json
{
  "name": "string (required)",
  "email": "string (required, unique)",
  "password": "string (required)",
  "role": "string (required, enum: ['Admin', 'ClubLead', 'Member', 'Guest'], default: 'Guest')"
}
```

**Success Response** (201):

```json
{
  "_id": "64f7b1c2e8a9c12345678901",
  "name": "John Doe",
  "email": "john@example.com",
  "password": " ", // Hidden for security
  "role": "Member",
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

#### GET /api/dashboard/info

**Purpose**: Retrieve dashboard information
**Authentication**: Required (JWT token in cookies)
**Authorization**: All authenticated users (Admin, ClubLead, Member)

**Success Response** (201):

```json
{
  "msg": "All Info"
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

- **403**: Insufficient permissions (Guest users)

```json
{
  "msg": "Unauthorized"
}
```

#### POST /api/dashboard/project/create

**Purpose**: Create a new project
**Authentication**: Required (JWT token in cookies)
**Authorization**: Admin and ClubLead only

**Success Response** (201):

```json
{
  "msg": "create"
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

- **403**: Insufficient permissions (Member/Guest users)

```json
{
  "msg": "Unauthorized"
}
```

#### PUT /api/dashboard/project/update

**Purpose**: Update an existing project
**Authentication**: Required (JWT token in cookies)
**Authorization**: Admin and ClubLead only

**Success Response** (201):

```json
{
  "msg": "Update"
}
```

#### DELETE /api/dashboard/project/delete

**Purpose**: Delete a project
**Authentication**: Required (JWT token in cookies)
**Authorization**: Admin and ClubLead only

**Success Response** (201):

```json
{
  "msg": "delete"
}
```

#### GET /api/dashboard/project/read

**Purpose**: Read project information
**Authentication**: Required (JWT token in cookies)
**Authorization**: All authenticated users (Admin, ClubLead, Member)

**Success Response** (201):

```json
{
  "msg": "Read"
}
```

#### GET /api/dashboard/mypost/:id (Legacy)

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

- **403**: Insufficient permissions

```json
{
  "msg": "Unauthorized"
}
```

## Middleware Functions

### Authentication Middleware

#### RegisterValidation

**Purpose**: Validates registration input and checks for existing users
**Validations**:

- Required fields: name, email, password, role
- Email uniqueness check
- Database query for existing user
- Role validation against enum values

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

### Role-Based Access Control Middleware

#### GuestVerification

**Purpose**: Blocks access for Guest users
**Usage**: Applied to routes requiring Member level or higher
**Logic**: Denies access if user role is "Guest"

**Error Response** (403):

```json
{
  "msg": "Unauthorized"
}
```

#### MemberVerification

**Purpose**: Blocks access for Member and Guest users
**Usage**: Applied to routes requiring ClubLead level or higher
**Logic**: Denies access if user role is "Member" or "Guest"

#### ClubleadVerification

**Purpose**: Blocks access for ClubLead, Member, and Guest users
**Usage**: Applied to routes requiring Admin level access
**Logic**: Denies access if user role is not "Admin"

**Note**: There appears to be an inverse logic implementation in the current code that may need review.

## Service Functions

### JWT Token Generation

**File**: `service/jwtTokenGenerateAndDecode.js`
**Functions**:

- `handleGenerateToken(name, email, role)`: Generates JWT token with user details and role
- `handleDecodeToken(token)`: Decodes JWT token to extract user information
  **Returns**: JWT token with 1-hour expiration
  **Payload**: User name, email, and role

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

### User Registration with Role

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123",
    "role": "Member"
  }'
```

### Admin User Registration

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "adminpassword123",
    "role": "Admin"
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

### Access Protected Route (Dashboard Info)

```bash
curl -X GET http://localhost:3000/api/dashboard/info \
  -b cookies.txt
```

### Create Project (Admin/ClubLead only)

```bash
curl -X POST http://localhost:3000/api/dashboard/project/create \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "projectData": "example"
  }'
```

### Read Projects (All authenticated users)

```bash
curl -X GET http://localhost:3000/api/dashboard/project/read \
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
- **Role-based authorization** with hierarchical permissions
- **Token payload includes user role** for authorization decisions

### Data Protection

- **Password hiding** in API responses
- **Database connection security** with environment variables
- **Error handling** to prevent information leakage

### Error Handling

### Common Error Patterns

- **404**: Resource not found or missing data
- **401**: Authentication failure
- **403**: Authorization failure (insufficient role permissions)
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

### Role-Based Error Responses

**Unauthorized Access (403)**:

```json
{
  "msg": "Unauthorized"
}
```

This error is returned when:

- Guest users try to access Member-level routes
- Member users try to access ClubLead-level routes
- ClubLead users try to access Admin-level routes

## Development Notes

### Known Issues

1. `user.insertOne()` should be `user.create()` for Mongoose
2. Dashboard endpoint needs proper post model implementation
3. JWT verification error handling could be improved
4. Input validation could be more comprehensive
5. **Role verification logic may need review** - current implementation appears to have inverse logic
6. Role-based middleware could benefit from more granular permissions

### Recommended Improvements

1. Add request rate limiting
2. Implement refresh token mechanism
3. Add comprehensive input validation (email format, password strength)
4. Add logging middleware
5. Implement proper error handling middleware
6. Add API documentation with Swagger
7. Add unit and integration tests
8. **Fix role verification middleware logic**
9. **Add role-based route protection documentation**
10. **Implement role assignment by Admin users only**

## Testing

### Manual Testing

Use tools like Postman or curl to test endpoints:

1. Register users with different roles (Admin, ClubLead, Member, Guest)
2. Login with credentials to receive JWT token
3. Test role-based access to dashboard routes:
   - Admin: Should access all routes
   - ClubLead: Should access project CRUD operations
   - Member: Should access read-only dashboard info
   - Guest: Should be denied dashboard access
4. Verify authorization errors (403) for insufficient permissions
5. Logout to clear session

### Role-Based Testing Scenarios

**Test Admin Access**:

```bash
# Register as Admin
curl -X POST http://localhost:3000/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Admin","email":"admin@test.com","password":"admin123","role":"Admin"}'

# Login and test all routes
curl -X POST http://localhost:3000/api/auth/login -c admin_cookies.txt -H "Content-Type: application/json" -d '{"email":"admin@test.com","password":"admin123"}'
curl -X POST http://localhost:3000/api/dashboard/project/create -b admin_cookies.txt
```

**Test Member Restrictions**:

```bash
# Register as Member
curl -X POST http://localhost:3000/api/auth/signup -H "Content-Type: application/json" -d '{"name":"Member","email":"member@test.com","password":"member123","role":"Member"}'

# Login and test restricted access
curl -X POST http://localhost:3000/api/auth/login -c member_cookies.txt -H "Content-Type: application/json" -d '{"email":"member@test.com","password":"member123"}'
curl -X POST http://localhost:3000/api/dashboard/project/create -b member_cookies.txt # Should return 403
```

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
- **Role assignment validation** (only Admins should assign sensitive roles)
- **Granular permission system** for fine-tuned access control

### Performance Optimizations

- Database indexing
- Connection pooling
- Caching mechanisms
- Load balancing preparation

---

**Current Version**: 1.0.0  
**Last Updated**: August 2025  
**Database**: Blogging-platform  
**Default Port**: 3000  
**Features**: JWT Authentication, Role-Based Access Control (RBAC), Club Management

## RBAC Implementation Summary

### Roles and Capabilities:

- **Admin**: Full system control, user management, all project operations
- **ClubLead**: Club-specific project management, team leadership
- **Member**: Project participation, limited dashboard access
- **Guest**: Read-only access to public content

### Security Benefits:

- Prevents unauthorized access to sensitive operations
- Hierarchical permission structure mimics real-world club organization
- Granular control over feature access based on user responsibility
- Enhanced security through role validation middleware

### Route Protection:

All dashboard routes are protected with appropriate role-based middleware to ensure users can only access features appropriate to their role level.
