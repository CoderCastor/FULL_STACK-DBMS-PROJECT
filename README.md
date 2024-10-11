To handle user registration and login for authentication, you’ll be working with three main components in your backend:

	1.	Controller: Contains the logic for registering a user and logging them in.
	2.	Routes: Defines the endpoints for the registration and login requests.
	3.	Model: Handles interactions with the MySQL database, such as checking if a user exists and creating new users.

Here’s how you can structure the authentication flow:

Folder Structure (Updated)

backend/
├── controllers/
│   ├── authController.js     // Contains register and login logic
├── models/
│   ├── userModel.js          // Handles database queries for user
├── routes/
│   ├── authRoutes.js         // Defines routes for registration and login
├── services/
│   ├── authService.js        // Authentication service (JWT)
├── middlewares/
│   ├── authMiddleware.js     // Handles protected routes
├── utils/
│   └── db.js                 // MySQL database connection
├── app.js                    // Main app configuration
├── server.js                 // Starts the server
└── .env                      // Environment variables

1. Register & Login Logic in authController.js

This controller will handle registration (checking if a user already exists and creating new users) and login (validating credentials and generating a JWT).

// controllers/authController.js
const { findUserByUsername, createUser } = require('../models/userModel');
const { generateToken } = require('../services/authService');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  try {
    // Check if user or email already exists
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const newUser = await createUser({
      username,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: 'User registered successfully', userId: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = generateToken(user);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

2. Database Queries in userModel.js

Here, we query the MySQL database to find a user by their username and create a new user if they don’t already exist.

// models/userModel.js
const { getConnection } = require('../utils/db');

// Find user by username
const findUserByUsername = async (username) => {
  const connection = getConnection();
  const [rows] = await connection.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

// Create a new user in the database
const createUser = async (user) => {
  const connection = getConnection();
  const { username, email, password, role } = user;
  const result = await connection.execute(
    'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', 
    [username, email, password, role]
  );
  return result[0].insertId;
};

module.exports = { findUserByUsername, createUser };

3. Authentication Routes in authRoutes.js

Define the registration and login routes in this file.

// routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();

// Registration route
router.post('/register', registerUser);

// Login route
router.post('/login', loginUser);

module.exports = router;

4. JWT Token Generation in authService.js

This service generates the JWT for authentication.

// services/authService.js
const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

5. Protect Routes Using Middleware in authMiddleware.js

To protect other routes (e.g., admin, teacher, student routes), we need to use a middleware to verify the JWT.

// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { findUserById } = require('../models/userModel');

exports.authenticateUser = async (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.id); // Find user from MySQL by ID
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

6. app.js (Register Routes)

Make sure to register the authentication routes in your main app.js file.

// app.js
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./utils/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use('/auth', authRoutes);

module.exports = app;

7. MySQL Schema

Make sure your MySQL database has a table for users. Here’s a sample schema:

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'teacher', 'student') NOT NULL
);

8. Environment Variables (.env)

You should also have environment variables to manage the database and JWT secret.

# .env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
JWT_SECRET=yourjwtsecret

9. Run the Backend

Finally, use Nodemon to run the backend as described earlier.

npm run dev

Flow Summary

	1.	Register User: When a user submits registration data, the server checks if the username or email exists, hashes the password, and creates the user in the database.
	2.	Login User: When a user logs in, their credentials are checked, and if valid, a JWT is generated and returned to the user.
	3.	Protect Routes: The JWT is passed in the headers of subsequent requests to access protected routes (like /admin/dashboard), where it is verified by the middleware.

This structure ensures secure registration, login, and route protection for your app.
