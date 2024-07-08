const express = require("express")
const app = express()
const mongoose = require('mongoose');
const GokartSchema = require('../schema/gokarts');


const Gokart = mongoose.model('Gokarts', GokartSchema);

app.get("/GetGokartSpecifiedInfo/:gokart_ID", async (req,res)=>{
    try {
        const gokart_ID = req.params.gokart_ID

        if (!gokart_ID) {
            return res.status(400).json({ message: 'gokart_ID is missing' });
        }


        const gokartsData = await Gokart.findById(gokart_ID).exec();
        console.log(gokartsData)
        res.status(201).json({ message: 'Found gokarts.', GokartsData: gokartsData});
    } catch (error) {
        console.error('Error during searching for gokarts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;