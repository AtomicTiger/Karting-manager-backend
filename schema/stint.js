const mongoose = require('mongoose');
const { Schema } = mongoose;

const StintSchema = new Schema({
    EventID: { type: mongoose.Schema.Types.ObjectId },
    Driver: String,
    GokartID: { type: mongoose.Schema.Types.ObjectId },
    BestLap: String,
    Pit: {
        type: Number,
        default: 1 
    }
});


module.exports = StintSchema;