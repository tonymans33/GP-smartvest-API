const mongoose = require('mongoose');

const LoggedUsers = new mongoose.Schema({
    uid: {
        type: String,
    },
    username:{
        type: String
    },
    date: {
        type: Date, 
        default: Date.now 
    }
})

const LoggedUserModel = mongoose.model("LoggedUserModel", LoggedUsers);
module.exports = LoggedUserModel;  