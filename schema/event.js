const mongoose = require('mongoose');
const { Schema } = mongoose;

const EventSchema = new Schema({
    Name: {type: String, required: true},
    Driver1: {type: String, required: true},
    Driver2: {type: String, required: true},
    Driver3: String,
    Driver4: String,
    Driver5: String,
    Date:Date,
    
});


module.exports = EventSchema;