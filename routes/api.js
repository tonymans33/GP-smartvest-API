const express = require("express");

const app = express();

app.get('/test', (req, res) => { 
    res.status(200).send("Test API is working!!!")
    console.log("yeah!")
    });

module.exports = app;