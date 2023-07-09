require('dotenv').config()
var express = require('express');
const sequelize = require('../util/database.js');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    email = req.body.email
    password = req.body.password
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser !== null) {
        res.status(200).send("Email is already taken");
    } else {
        if(await registeration(email,password))
            res.status(201).json({ message: 'User registered successfully!' });
        else
            res.status(500).json({ error: 'Failed to register user.' });
    }
}
async function registeration(email,password){
    console.log(password)
    const salt = await bcrypt.genSalt(20);
    console.log(salt)
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

module.exports = {
    register,
    login
};