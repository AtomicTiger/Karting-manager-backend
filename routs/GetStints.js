const express = require("express")
const app = express()
const mongoose = require('mongoose');
const StintSchema = require('../schema/stint');


const  Stint = mongoose.model('Stints', StintSchema);

app.get("/StintsInfo/:event_ID", async (req,res)=>{
    try {
        const event_ID = req.params.event_ID

        if (!event_ID ) {
            return res.status(400).json({ message: 'eventID is missing' });
        }


        const StinsData =  await Stint.find({EventID: event_ID}).exec();

        res.status(201).json({ message: 'Found gokarts.', StintsData: StinsData});
    } catch (error) {
        console.error('Error during searching for gokarts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;