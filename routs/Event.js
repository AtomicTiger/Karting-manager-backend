const express = require("express")
const app = express()
const mongoose = require('mongoose');
const EventSchema = require('../schema/event');


const Event = mongoose.model('Events', EventSchema);

app.post("/eventCreation", async (req,res)=>{
    try {
        const { name,userId, driver1, driver2, driver3, driver4, driver5, date } = req.body;

        if (!name || !driver1 || !driver2) {
            return res.status(400).json({ message: 'Name and at least 2 drivers are required' });
        }


        const NewEvenet = await Event.create({ Name: name, UserID: userId, Driver1: driver1, Driver2: driver2, Driver3: driver3, Driver4: driver4, Driver5: driver5, Date: date });
        res.status(201).json({event_id: NewEvenet._id, message: 'Event creted successfully.'});
    } catch (error) {
        console.error('Error during creating event:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;