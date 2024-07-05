const express = require("express")
const app = express()
const mongoose = require('mongoose');
const EventSchema = require('../schema/event');


const Event = mongoose.model('Events', EventSchema);

app.get("/events/:userID", async (req,res)=>{
    try {
        const userID = req.params.userID

        if (!userID ) {
            return res.status(400).json({ message: 'userID is missing' });
        }


        const eventData =  await Event.find({UserID: userID}).exec();

        if(!eventData){
            return res.status(400).json({message: "Events not found"})
        }   

        res.status(201).json({ message: 'Found event.', Events: eventData});
    } catch (error) {
        console.error('Error during searching for event:', error);
        res.status(500).json({ message: 'Internal server error.' });    
    }
});

module.exports = app;