require('dotenv').config()
var express = require('express');
const sequelize = require('../util/database.js');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const jwtController = require('../Services/User.js');
const register = async (req, res) => {
    email = req.body.email
    password = req.body.password
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser !== null) {
        res.status(200).send("Email is already taken");

    } else {
        if(jwtController.validateEmailAndPassword(email,password))
        {
        if(await registeration(email,password))
            res.status(201).json({ message: 'User registered successfully!' });
        else
            res.status(500).json({ error: 'Failed to register user.' });
        }
        else
        {
            res.status(500).json({ error: 'Failed to register user.' });
         }  
    }
}
async function registeration(email,password){
    const salt = await bcrypt.genSalt(20);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log(hashedPassword)

    try {
        const newUser = await User.create({
        email: email,
        tokenPassword: hashedPassword,
        });
        return true;
    } catch (error) {
        return false;
    }
}

const login = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ where: { email: email } });

    if (user && await bcrypt.compare(password, user.tokenPassword)) {
        // create tokens
        const acesstoken = jwt.sign(
            { email : email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2h",
            }
        );
        res.status(200).send({token : acesstoken});
    } else {
        let result = "false";
        res.status(409).send(result);
    }
}
const getIdFromToken = (req, res, next) => {
    try {
      const token = req.headers.authorization; // Assuming the token is passed in the Authorization header
   
      // Validate and retrieve the id from the token using the jwtController
      const id = jwtController.getIdFromToken(token);
  
      res.status(200).json({ id });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  };

module.exports = {
    register,
    login,
    getIdFromToken
};