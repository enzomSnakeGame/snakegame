require('dotenv').config()
const user = require("../models/User");
const jwt = require('jsonwebtoken');

// Middleware function for token verification
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    // Add the decoded user information to the request object
    // console.log(decoded.email)
    req.user = decoded;
    next(); // Move to the next middleware or route handler
  } catch (error) {
    res.status(403).json({ message: 'Invalid token.' });
  }
}

const validateEmailAndPassword = (email, password) => {
    // Email validation
    if (!email || !email.includes("@")) {
      return false;
    }
    // Password validation
    if (!password || password.length < 8) {
      return false
    }
    // If both email and password are valid, return true or perform additional logic
    return true;
  };

  module.exports = {
    verifyToken,
    validateEmailAndPassword
};