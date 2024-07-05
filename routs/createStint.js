const express = require("express")
const app = express()
const mongoose = require('mongoose');
const GokartSchema = require('../schema/gokarts');
const StintSchema = require('../schema/stint');

const Gokart = mongoose.model('Gokarts', GokartSchema);
const Stint = mongoose.model('Stints', StintSchema);

app.post("/stint/:EventID", async (req,res)=>{
    console.log(req.body)
    console.log(req.params)
    try {
        const EventID = req.params.EventID; 
        const {gokart, driver, fastestLap} = req.body;
        console.log(gokart, driver, fastestLap)
        const lastPit = await Stint.findOne().sort({ Pit: -1 }).exec();
        let nextPit = 0
        if(lastPit){
            nextPit = lastPit.Pit + 1;
        }else{
            nextPit = 1;
        }
        if (!gokart || !driver || !fastestLap ) {
            return res.status(400).json({ message: 'All data are required' });
        }

        const gokartData = await Gokart.findOne({EventID: EventID, Number: gokart}).exec();
        if(!gokartData){
            return res.status(400).json({message: "Gokart don't exist"})
        }
        await Stint.create({EventID: EventID, Driver: driver, GokartID: gokartData._id, BestLap: fastestLap, Pit: parseInt(nextPit)})
        res.status(201).json({ message: 'Stint creted successfully.'});
    } catch (error) {
        console.error('Error during creating Stint:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;