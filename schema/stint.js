const mongoose = require('mongoose');
const { Schema } = mongoose;

const StintSchema = new Schema({
    EventID: { type: mongoose.Schema.Types.ObjectId },
    Driver: String,
    GokartID: { type: mongoose.Schema.Types.ObjectId },
    BestLap: String,
    Duration: String,
    Pit: Number
});


module.exports = StintSchema;