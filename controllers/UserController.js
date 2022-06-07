const User = require('../models/userModel');
const mongoose = require('mongoose');

exports.insertUser = (req, res, next) => {
    
        try {
    
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                uid: req.body.uid,
                username: req.body.username,
                email: req.body.email,
                date: new Date(),
                emergencyNumber: req.body.emergencyNumber,
                deviceToken : req.body.deviceToken
            });
    
            user.save().then(result => {
                res.status(201).json({
                    status: "success",
                    message: "User created successfully !"
                })
            }).catch(err => {
                res.status(500).json({
                    status: "fail",
                    message: err.message
                })
            })
    
        } catch (e) {
            res.status(500).json({
                status: "fail",
                message: e.message
            })
        }
    
    }