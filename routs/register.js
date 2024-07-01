const express = require("express")
const app = express()
const mongoose = require('mongoose');
const UserSchema = require('../schema/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require("dotenv").config({path: '../.env' });

const User = mongoose.model('User', UserSchema);

const jwt = require('jsonwebtoken')
const accessCode = process.env.ACCESS_TOKEN_SECRET
console.log(accessCode)
app.post("/register", async (req,res)=>{
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ message: 'Login and password are required.' });
        }

        const existingUser = await User.findOne({ Login: login }).exec();
        
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists.' });
        }
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await User.create({ Login: login, Pass: hash });
        const accessToken = jwt.sign({userId: newUser._id, login: newUser.Login}, accessCode)
        return res.status(201).json({accessToken: accessToken, message: 'User registered.' });

    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;