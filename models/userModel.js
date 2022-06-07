const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    uid:{
        type: String,
        unique: true
    },
    date: {
        type: Date, 
        default: Date.now 
    },
    email: {
        type: String,
    },
    deviceToken:{
        type: String,
    },
    emergencyNumber:{
        type: String,
    }
})

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;  