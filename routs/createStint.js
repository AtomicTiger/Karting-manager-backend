const express = require("express")
const app = express()
const mongoose = require('mongoose');
const GokartSchema = require('../schema/gokarts');
const StintSchema = require('../schema/stint');

const Gokart = mongoose.model('Gokarts', GokartSchema);
const Stint = mongoose.model('Stints', StintSchema);

app.post("/stintCreation/:EventID", async (req,res)=>{
    try {
        const EventID = req.params.EventID; 
        const { gokart, driver, time, fastestLap, Pit} = req.body;

        if (!gokart || !driver || !time || !fastestLap || !Pit ) {
            return res.status(400).json({ message: 'All data are required' });
        }

        const gokartData = await Gokart.findOne({EventID: EventID, Number: gokart}).exec();
        if(!gokartData){
            return res.status(400).json({message: "Stint don't exist"})
        }

        await Stint.create({EventID: EventID, Driver: driver, GokartID: gokartData._id, BestLap: fastestLap, Duration: time, Pit: Pit})
        res.status(201).json({ message: 'Stint creted successfully.'});
    } catch (error) {
        console.error('Error during creating Stint:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;