const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Login: String,
    Pass: String,
});

module.exports =  UserSchema;