const express = require("express")
const app = express()
const mongoose = require('mongoose');
const GokartSchema = require('../schema/gokarts');

let i = 0;

const Gokart = mongoose.model('Gokarts', GokartSchema);

app.post("/gokartsCreation/:eventID", async (req,res)=>{
    try {
        const eventID = req.params.eventID 
        const { gokarts } = req.body;

        if (!gokarts) {
            return res.status(400).json({ message: 'Gokarts are required' });
        }

        await Promise.all(gokarts.map(async (number) => {
            await Gokart.create({
                Number: number,
                EventID: eventID,
                Status: null,
                FastestLap: null
            });
        }));
        

        res.status(201).json({ message: 'Gokarts creted successfully.'});
    } catch (error) {
        console.error('Error during creating gokarts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;