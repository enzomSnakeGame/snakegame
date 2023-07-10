require('dotenv').config()
const User = require("../models/User");
const jwt = require('jsonwebtoken');

// Middleware function for token verification
const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization'];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log(decoded.email);
    // Find the user in the database using the email from the decoded token
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Add the user's id to the request object
    req.playerId = user.id;

    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.log(error)
    res.status(403).json({ message: 'Invalid token.' });
  }
};

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