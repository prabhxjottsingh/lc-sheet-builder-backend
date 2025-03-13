# LeetCode Custom Sheet Builder - Backend

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Directory Structure](#directory-structure)
- [.env File Template](#env-file-template)
- [Available Scripts](#available-scripts)

---

## Project Overview

The **LeetCode Custom Sheet Builder** is a platform where users can create personalized sheets to organize and track their problem-solving progress on LeetCode. Each sheet can contain multiple categories, and each category can include multiple problems. The backend is designed using Node.js and MongoDB, providing a robust API for user management, sheet creation, and problem categorization.

---

## Features

- User authentication and management
- CRUD operations for custom sheets, categories, and problems
- Support for public and private sheets
- Nested relationships between sheets, categories, and problems
- Real-time data validation using `zod`
- Scalable NoSQL database design

---

## Tech Stack

- **Backend Framework**: Node.js (Express.js)
- **Database**: MongoDB (Mongoose for ORM)
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: `zod`
- **Environment Management**: `dotenv`
- **Development Tools**: Nodemon, Chalk

---

## Directory Structure

```
LC-SHEET-BUILDER-BACKEND/
├──── controllers/
│ ├──── authController.js
│ ├──── categoryController.js
│ ├──── problemController.js
│ ├──── sheetController.js
│ └── userController.js
├──── dbAccessor/
│ ├──── categoryDBAccessor.js
│ ├──── problemDBAccessor.js
│ ├──── sheetDBAccessor.js
│ └── userDBAccessor.js
├──── middlewares/
│ ├──── apiRequestModels/
│ ├──── tokenDecryption.js
│ └── typeSafetyValidationCheck.js
├──── models/
│ ├──── Category.js
│ ├──── Problem.js
│ ├──── Sheet.js
│ └── User.js
├──── routes/
│ ├──── authRoutes.js
│ ├──── categoryRoutes.js
│ ├──── problemRoutes.js
│ ├──── sheetRoutes.js
│ └── userRoutes.js
├──── utils/
│ ├──── apiResponse.js
│ ├──── connectDB.js
│ └── constants.js
├──── .env
├──── .gitignore
├──── package.json
├──── package-lock.json
└──── index.js
```

---

## .env File Template

Create a `.env` file in the root directory and add the following variables:

```
# Database Configuration
MONGO_URI=your_mongodb_connection_string

# Server Configuration
PORT=5000  # Default port for the server

# Authentication
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRATION=1d  # Token expiration time (1d = 1 day)
```

---

## Available Scripts

- **npm run dev**: Runs the server in development mode using nodemon `(on the <PORT-NUMBER> used in the .env file)` .
