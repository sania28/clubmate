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

### Project Management Endpoints

#### POST /api/dashboard/project/create

**Purpose**: Create a new project
**Authentication**: Required (JWT token in cookies)
**Authorization**: Admin and ClubLead only
**Input**:

```json
{
  "title": "string (required)",
  "shortinfo": "string (required)",
  "description": "string (required)",
  "techstack": "string (required)"
}
```

**Success Response** (201):

```json
{
  "msg": "create"
}
```

**Error Responses**:

- **404**: Missing required fields

```json
{
  "msg": "All fields are require"
}
```

- **404**: Authentication required

```json
{
  "msg": "User must be login"
}
```

- **404**: Insufficient permissions (Member/Guest users)

```json
{
  "msg": "Unauthorized"
}
```

- **401**: Invalid token

```json
{
  "msg": "Invalid User"
}
```

#### PUT /api/dashboard/project/update

**Purpose**: Update an existing project
**Authentication**: Required (JWT token in cookies)
**Authorization**: Admin, ClubLead, and Member (Member level access required)
**Input**: Project data to be updated (format depends on implementation)

**Success Response** (201):

```json
{
  "msg": "Update"
}
```

**Error Responses**:

- **404**: Authentication required

```json
{
  "msg": "User must be login"
}
```

- **401**: Insufficient permissions (Guest users)

```json
{
  "msg": "Unauthorized"
}
```

- **401**: Invalid token

```json
{
  "msg": "Invalid User"
}
```

#### DELETE /api/dashboard/project/delete

**Purpose**: Delete a project
**Authentication**: Required (JWT token in cookies)
**Authorization**: Admin and ClubLead only
**URL Parameters**: May require project ID (implementation dependent)

**Success Response** (201):

```json
{
  "msg": "delete"
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

#### POST /api/dashboard/project/members

**Purpose**: Add members to a project
**Authentication**: Required (JWT token in cookies)
**Authorization**: Admin, ClubLead, and Member (All authenticated users except Guest)
**Input**:

```json
{
  "name": "string (required)",
  "stream": "string (required)",
  "year": "string (required)"
}
```

**Success Response** (201):

```json
{
  "msg": "Member added successfully"
}
```

**Error Responses**:

- **401**: Missing required fields

```json
{
  "msg": "All fields are require"
}
```

- **404**: Authentication required

```json
{
  "msg": "User must be login"
}
```

- **404**: Insufficient permissions (Guest users)

```json
{
  "msg": "Unauthorized"
}
```

- **401**: Invalid token

```json
{
  "msg": "Invalid User"
}
```

#### GET /api/dashboard/mypost/:id (Legacy)

**Purpose**: Retrieve user's posts by ID
**Authentication**: Required (JWT token in cookies)
**Authorization**: All authenticated users (Admin, ClubLead, Member)
**URL Parameters**:

- `id`: MongoDB ObjectId of the user (required)

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

- **403**: Insufficient permissions (Guest users)

```json
{
  "msg": "Unauthorized"
}
```

## Route Parameters and Requirements Summary

### Routes Requiring Project ID

The following routes may require project ID as URL parameter or in request body (implementation dependent):

- `PUT /api/dashboard/project/update` - Project ID needed to identify which project to update
- `DELETE /api/dashboard/project/delete` - Project ID needed to identify which project to delete

### Routes Requiring User ID

- `GET /api/dashboard/mypost/:id` - User ID required as URL parameter

### Input Validation Requirements

#### Project Creation (`POST /api/dashboard/project/create`)

**Required Fields**:

- `title`: Project title
- `shortinfo`: Brief project description
- `description`: Detailed project description
- `techstack`: Technologies used in the project

#### Project Member Addition (`POST /api/dashboard/project/members`)

**Required Fields**:

- `name`: Member name
- `stream`: Academic stream/department
- `year`: Academic year

#### User Registration (`POST /api/auth/signup`)

**Required Fields**:

- `name`: User's full name
- `email`: Valid email address (unique)
- `password`: Secure password
- `role`: User role (Admin, ClubLead, Member, Guest)

#### User Login (`POST /api/auth/login`)

**Required Fields**:

- `email`: Registered email address
- `password`: User password

## Role-Based Access Control Summary

### Project Management Permissions

| Action              | Admin | ClubLead | Member | Guest |
| ------------------- | ----- | -------- | ------ | ----- |
| Create Project      | ✅    | ✅       | ❌     | ❌    |
| Update Project      | ✅    | ✅       | ✅     | ❌    |
| Delete Project      | ✅    | ✅       | ❌     | ❌    |
| Read Projects       | ✅    | ✅       | ✅     | ❌    |
| Add Project Members | ✅    | ✅       | ✅     | ❌    |
| Dashboard Info      | ✅    | ✅       | ✅     | ❌    |
| View User Posts     | ✅    | ✅       | ✅     | ❌    |

### Authorization Levels

1. **Admin Access**: Full CRUD operations on all projects
2. **ClubLead Access**: Full CRUD operations on club projects, member management
3. **Member Access**: Can update projects and add members, read-only for other operations
4. **Guest Access**: No dashboard or project access

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
    "title": "Web Development Club Platform",
    "shortinfo": "A platform for club management and project collaboration",
    "description": "This project aims to create a comprehensive platform for managing club activities, projects, and member interactions. It includes user authentication, role-based access control, and project management features.",
    "techstack": "Node.js, Express.js, MongoDB, JWT, React.js"
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
7. **Project update endpoint allows Member access but creation/deletion requires higher permissions**
8. **Project ID parameter handling needs clarification in update/delete operations**
9. **Member addition to projects requires validation for duplicate entries**

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
11. **Add project ownership validation for update/delete operations**
12. **Implement proper project ID validation middleware**
13. **Add member duplicate check for project member additions**

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
curl -X POST http://localhost:3000/api/dashboard/project/create -b member_cookies.txt # Should return 404 Unauthorized
```

**Test Member Project Update Access**:

```bash
# Member can update projects
curl -X PUT http://localhost:3000/api/dashboard/project/update -b member_cookies.txt -H "Content-Type: application/json"
```

**Test Guest Restrictions**:

```bash
# Guest cannot access any project endpoints
curl -X GET http://localhost:3000/api/dashboard/info -b guest_cookies.txt # Should return 403 Unauthorized
```
