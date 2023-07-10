require('dotenv').config()
const user = require("../models/User");
const jwt = require('jsonwebtoken');

// Function to retrieve the id from a JWT token
exports.getIdFromToken = (token) => {
    
    try {
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        const email = decodedToken.email; // Assuming the email is stored in the 'email' claim of the JWT payload
        console.log('Email:', email);
        return email;
      } catch (error) {
        console.error('Failed to verify JWT:', error.message);
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