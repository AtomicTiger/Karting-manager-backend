const express = require("express")
const app = express()
const mongoose = require('mongoose');
const EventSchema = require('../schema/event');
const GokartSchema = require('../schema/gokarts');
const StintSchema = require('../schema/stint');

const Event = mongoose.model('Events', EventSchema);
const Gokart = mongoose.model('Gokart', GokartSchema);
const Stint = mongoose.model('Stint', StintSchema)

app.post("/eventDel/:EventID", async (req,res)=>{
    try {
        const EventID = req.params.EventID
        await Event.deleteOne({ _id: EventID });
        await Gokart.deleteMany({ EventID: EventID });
        await Stint.deleteMany({ EventID: EventID });
        res.status(201).json({message: 'Event deleted successfully.'});
    } catch (error) {
        console.error('Error during creating event:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;