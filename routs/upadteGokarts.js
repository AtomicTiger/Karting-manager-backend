const express = require("express")
const app = express()
const mongoose = require('mongoose');
const GokartSchema = require('../schema/gokarts');


const Gokart = mongoose.model('Gokarts', GokartSchema);

app.post("/gokartUpdate/:GokartID", async (req,res)=>{
    try {
        const GokartID = req.params.GokartID
        const {Number, Status, FastestLap } = req.body
        if (!GokartID ) {
            return res.status(400).json({ message: 'gokartID is missing' });
        }

        const result = await Gokart.updateOne(
            { _id: GokartID },
            { $set: { Number: Number, Status: Status, FastestLap: FastestLap } }
        ).exec();
        
        res.status(201).json({ message: 'Updated gokart.', result: result });
    } catch (error) {
        console.error('Error during updating gokart:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;