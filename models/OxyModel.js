const mongoose = require('mongoose');

const OxySchema = new mongoose.Schema({
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

const OxyModel = mongoose.model("OxyModel", OxySchema);
module.exports = OxyModel;  