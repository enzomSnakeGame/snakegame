const user = require("../models/User");
const jwt = require('jsonwebtoken');

// Function to retrieve the id from a JWT token
exports.getIdFromToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const id = decodedToken.id;
    return id;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

exports.validateEmailAndPassword = (email, password) => {
    // Email validation
    if (!email || !email.includes("@")) {
      throw new Error("Invalid email");
    }
  
    // Password validation
    if (!password || password.length < 8) {
      throw new Error("Invalid password");
    }
  
    // If both email and password are valid, return true or perform additional logic
    return true;
  };