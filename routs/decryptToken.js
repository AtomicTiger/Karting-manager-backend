const express = require("express")
const app = express()

app.get("/decrypt", async (req,res)=>{
    try {   
        const token  = token 


        res.status(201).json({ message: 'Decrypted',});
    } catch (error) {
        console.error('Error during searching for gokarts:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

module.exports = app;