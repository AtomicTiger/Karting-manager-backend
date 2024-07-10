const express = require("express")
const app = express()
const mongoose = require('mongoose');
const GokartSchema = require('../schema/gokarts');


const Gokart = mongoose.model('Gokarts', GokartSchema);

app.post("/FastestLapUpdate/:EventID", async (req,res)=>{
    try {
        const EventID = req.params.EventID
        const {Number, FastestLap } = req.body
        
        const gokart = await Gokart.findOne({ Number: Number, EventID: EventID}).exec();
        if(parseFloat(FastestLap) < parseFloat(gokart.FastestLap) || gokart.FastestLap === null){
            const result = await Gokart.updateOne(
                { _id: gokart._id },
                { $set: { FastestLap: FastestLap } }
            ).exec();
            return res.status(201).json({ message: 'Updated gokart.'})
        }
        
        
        res.status(201).json({ message: 'Updated gokart.'});
    } catch (error) {
        console.error('Error during updating gokart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;