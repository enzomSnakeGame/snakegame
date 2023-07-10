require('dotenv').config()
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken')
const jwtController = require('../Services/User.js');

const register = async (req, res) => {
    email = req.body.email
    password = req.body.password
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser !== null) {
        res.status(409).json({ error: 'Email is already taken'});
    } else {
        if(jwtController.validateEmailAndPassword(email,password))
        {
            if(await registeration(email,password))
                res.status(201).json({ message: 'User registered successfully!' });
            else
                res.status(500).json({ error: 'Internal server error occurred while creating the account.' });
        }else{
            res.status(400).json({ error: 'email must have @ and password must larger than 8 characters' });
        }  
    }
}

async function registeration(email,password){
    console.log(email)
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
       
        const newUser = await User.create({
        email: email,
        tokenPassword: hashedPassword,
        });

        return true;
    } catch (error) {
        console.log(error)
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
        res.status(200).json({token : acesstoken});
    } else {
        res.status(401).json({ error: 'Incorrect email or password' });
    }
}

module.exports = {
    register,
    login
};