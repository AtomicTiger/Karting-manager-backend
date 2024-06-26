const express = require("express")
const app = express()
const mongoose = require('mongoose');
const EventSchema = require('../schema/event');


const Event = mongoose.model('Events', EventSchema);

app.get("/eventInfo/:eventID", async (req,res)=>{
    try {
        const eventID = req.params.eventID

        if (!eventID ) {
            return res.status(400).json({ message: 'eventID is missing' });
        }


        const eventData =  await Event.findById(eventID).exec();

        if(!eventData){
            return res.status(400).json({message: "Event not found"})
        }

        res.status(201).json({ message: 'Found event.', eventData: eventData});
    } catch (error) {
        console.error('Error during searching for event:', error);
        res.status(500).json({ message: 'Internal server error.' });    
    }
});

module.exports = app;