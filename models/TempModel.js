const mongoose = require('mongoose');

const TempSchema = new mongoose.Schema({
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

const TempModel = mongoose.model("TempModel", TempSchema);
module.exports = TempModel;  