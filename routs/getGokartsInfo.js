const express = require("express")
const app = express()
const mongoose = require('mongoose');
const GokartSchema = require('../schema/gokarts');


const Gokart = mongoose.model('Gokarts', GokartSchema);

app.get("/gokartInfo/:event_ID", async (req,res)=>{
    try {
        const event_ID = req.params.event_ID

        if (!event_ID ) {
            return res.status(400).json({ message: 'eventID is missing' });
        }


        const gokartsData =  await Gokart.find({EventID: event_ID}).exec();

        res.status(201).json({ message: 'Found gokarts.', GokartsData: gokartsData});
    } catch (error) {
        console.error('Error during searching for gokarts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;