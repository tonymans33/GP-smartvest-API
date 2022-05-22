const mongoose = require('mongoose');

const HeartRateSchema = new mongoose.Schema({
    read: {
        type: Number,
    },
    status:{
        type: String
    },
    date: {
        type: Date, 
        default: Date.now 
    }
})

const HeartRateModel = mongoose.model("HeartRateModel", HeartRateSchema);
module.exports = HeartRateModel;  