const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserSchema = require('../schema/user');
const bcrypt = require('bcrypt');

const User = mongoose.model('User', UserSchema);

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/login", async (req, res) => {
    try {
        const { login, password } = req.body;

        if (!login || !password) {
            return res.status(400).json({ message: 'Login and password are required.' });
        }

        const existingUser = await User.findOne({ Login: login }).exec();
        if (!existingUser) {
            return res.status(400).json({ message: 'Wrong password or login. Try again' });
        }

        const PassCheck = await bcrypt.compare(password, existingUser.Pass);
        if (PassCheck) {
            return res.status(201).json({ userId: existingUser._id, login: existingUser.Login, message: 'User logged in successfully.' });
        } else {
            return res.status(400).json({ message: 'Wrong password or login. Try again' });
        }
    } catch (error) {
        console.error('Error during user login:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;
