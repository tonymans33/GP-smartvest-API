const mongoose = require('mongoose');

const BatterySchema = new mongoose.Schema({
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

const BatteryModel = mongoose.model("BatteryModel", BatterySchema);
module.exports = BatteryModel;  