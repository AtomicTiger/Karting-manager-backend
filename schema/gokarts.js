const mongoose = require('mongoose');
const { Schema } = mongoose;

const GokartSchema = new Schema({
    Number: Number,
    EventID: { type: mongoose.Schema.Types.ObjectId },
    Status: String,
    FastestLap: String,
    
});


module.exports = GokartSchema;