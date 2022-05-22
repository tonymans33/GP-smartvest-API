const express = require("express");
const tempRoutes = require("./tempRoutes");
const batteryRoutes = require("./batteryRoutes");
const heartRateRoutes = require("./heartRateRoutes");
const oxyRoutes = require("./oxyRoutes");

const app = express();

app.use("/rates/temp", tempRoutes);
app.use("/rates/battery", batteryRoutes);
app.use("/rates/heartRate", heartRateRoutes);
app.use("/rates/oxy", oxyRoutes);

app.get('/test', (req, res) => { 
    res.status(200).send("Test API is working!!!")
    console.log("yeah!")
});


module.exports = app;