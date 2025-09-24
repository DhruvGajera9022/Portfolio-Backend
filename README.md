# Portfolio Backend API

A comprehensive RESTful API for managing portfolio data including authentication, profile management, skills, projects, experience, and contact information. Built with **Node.js**, **Express.js**, and **MongoDB**, this API includes features like **file uploads**, **rate limiting**, **JWT authentication**, and **Swagger documentation**.

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

---

## 🚀 Features

- **Authentication System**: Register, login, and password reset functionality
- **Profile Management**: View and update user profiles with avatar and resume uploads
- **Skills Management**: Complete CRUD operations for skills
- **Projects Portfolio**: Manage projects with multiple image uploads
- **Experience Tracking**: Professional experience with company logos and images
- **Contact Form**: Handle contact form submissions
- **Security**: Rate limiting, CORS protection, and security headers via Helmet
- **Documentation**: Auto-generated Swagger API documentation
- **File Uploads**: Cloudinary integration for image and file management
- **Error Handling**: Centralized error handling with consistent responses
- **Testing**: Comprehensive test suite with Jest and Supertest
- **CI/CD**: GitHub Actions workflow for automated testing and deployment

---

## 📁 Project Structure

```
├── .env.example
├── .github/
│   └── workflows/
│       └── ci.yml
├── README.md
├── docs/                    # API documentation
├── package.json
├── server.js               # Entry point
├── shared/
│   └── constants/          # Shared constants and test data
├── src/
│   ├── app.js              # Express app configuration
│   ├── config/             # Configuration files
│   │   ├── database.js     # MongoDB connection
│   │   ├── jwt.js          # JWT configuration
│   │   ├── cors.js         # CORS settings
│   │   ├── multer.js       # File upload configuration
│   │   ├── cloudinary.js   # Cloudinary setup
│   │   └── swagger.js      # Swagger documentation
│   ├── controllers/        # Route controllers
│   ├── enums/              # Enums for projects/skills
│   ├── middleware/         # Custom middlewares
│   │   ├── auth.js         # Authentication middleware
│   │   ├── validation.js   # Request validation
│   │   ├── errorHandler.js # Error handling
│   │   └── rateLimiter.js  # Rate limiting
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   │   ├── cloudinary.js   # Cloudinary helpers
│   │   ├── email.js        # Email utilities
│   │   ├── response.js     # Response helpers
│   │   └── logger.js       # Logging utilities
│   └── validations/        # Request validation schemas
└── tests/                  # Test files
    ├── files/              # Test assets (avatar, resume)
    ├── helpers.js          # Test helpers
    └── testSetup.js        # Test configuration
```

---

## 🛠️ Tech Stack

- **Backend Framework**: Node.js & Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary for image and file uploads
- **File Handling**: Multer for multipart/form-data
- **Security**: Helmet for security headers, CORS protection
- **Logging**: Morgan for HTTP request logging
- **Documentation**: Swagger/OpenAPI 3.0
- **Caching**: Redis (optional)
- **Testing**: Jest & Supertest
- **CI/CD**: GitHub Actions

---

## ⚡ Quick Start

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- Cloudinary account (for file uploads)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/DhruvGajera9022/Portfolio-Backend.git
   cd Portfolio-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file:**

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/portfolio
   JWT_SECRET=your_super_secret_jwt_key
   JWT_EXPIRES_IN=7d
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

6. **For production:**
   ```bash
   npm start
   ```

The server will be running at `http://localhost:5000`

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Authentication Routes (`/api/auth`)

| Method | Endpoint          | Description         | Access |
| ------ | ----------------- | ------------------- | ------ |
| POST   | `/register`       | Register a new user | Public |
| POST   | `/login`          | User login          | Public |
| POST   | `/reset-password` | Reset user password | Public |

### Profile Routes (`/api/profile`)

| Method | Endpoint | Description                         | Access  |
| ------ | -------- | ----------------------------------- | ------- |
| GET    | `/`      | Get current user profile            | Private |
| PUT    | `/`      | Update profile (with avatar/resume) | Private |

### Skills Routes (`/api/skills`)

| Method | Endpoint | Description           | Access |
| ------ | -------- | --------------------- | ------ |
| GET    | `/`      | Get all skills        | Public |
| GET    | `/:id`   | Get skill by ID       | Public |
| POST   | `/`      | Create a new skill    | Admin  |
| PUT    | `/:id`   | Update existing skill | Admin  |
| DELETE | `/:id`   | Delete a skill        | Admin  |

### Projects Routes (`/api/projects`)

| Method | Endpoint | Description             | Access |
| ------ | -------- | ----------------------- | ------ |
| GET    | `/`      | Get all projects        | Public |
| GET    | `/:id`   | Get project by ID       | Public |
| POST   | `/`      | Create new project      | Admin  |
| PUT    | `/:id`   | Update existing project | Admin  |
| DELETE | `/:id`   | Delete a project        | Admin  |

### Experience Routes (`/api/experience`)

| Method | Endpoint | Description                | Access        |
| ------ | -------- | -------------------------- | ------------- |
| GET    | `/`      | Get all experiences        | Public        |
| GET    | `/:id`   | Get experience by ID       | Public        |
| POST   | `/`      | Create new experience      | Auth Optional |
| PUT    | `/:id`   | Update existing experience | Auth Optional |
| DELETE | `/:id`   | Delete an experience       | Auth Optional |

### Contact Routes (`/api/contact`)

| Method | Endpoint | Description         | Access |
| ------ | -------- | ------------------- | ------ |
| POST   | `/`      | Submit contact form | Public |

---

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```bash
Authorization: Bearer <your-jwt-token>
```

### Example Login Request:

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'
```

---

## 📤 File Uploads

The API supports file uploads for:

- **Profile avatars** (images)
- **Resumes** (PDF files)
- **Project images** (multiple images per project)
- **Company logos** (for experience entries)

Files are uploaded to Cloudinary and URLs are stored in the database.

### Example File Upload:

```bash
curl -X PUT http://localhost:5000/api/profile \
  -H "Authorization: Bearer <token>" \
  -F "avatar=@/path/to/image.jpg" \
  -F "name=John Doe"
```

---

## 🔧 Error Handling

The API uses centralized error handling with consistent response format:

```json
{
  "success": false,
  "message": "Error description",
  "statusCode": 400,
  "stack": "Error stack (development only)"
}
```

Common HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

---

## 📖 Interactive API Documentation

Access the Swagger UI documentation at:

```
http://localhost:5000/api-docs
```

The interactive documentation allows you to:

- Explore all available endpoints
- Test API calls directly from the browser
- View request/response schemas
- Understand authentication requirements

---

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test
```

Test categories:

- **Unit Tests**: Individual function testing
- **Integration Tests**: API endpoint testing
- **Authentication Tests**: JWT and auth middleware testing
- **File Upload Tests**: Multer and Cloudinary integration testing

---

## 🚀 Deployment

### Environment Setup

1. Set `NODE_ENV=production`
2. Use a production MongoDB instance
3. Configure proper JWT secrets
4. Set up Cloudinary production environment
5. Configure rate limiting for production traffic

### Development Guidelines:

- Follow ESLint configuration
- Write tests for new features
- Update documentation for API changes
- Use conventional commit messages

---

## 📋 Environment Variables

| Variable                | Description               | Default     |
| ----------------------- | ------------------------- | ----------- |
| `NODE_ENV`              | Environment mode          | development |
| `PORT`                  | Server port               | 5000        |
| `MONGO_URI`             | MongoDB connection string | -           |
| `JWT_SECRET`            | JWT signing secret        | -           |
| `JWT_EXPIRES_IN`        | JWT expiration time       | 7d          |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     | -           |
| `CLOUDINARY_API_KEY`    | Cloudinary API key        | -           |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret     | -           |

---

**Built with ❤️ using Node.js and Express.js**
