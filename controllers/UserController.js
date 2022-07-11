const User = require('../models/userModel');
const mongoose = require('mongoose');
const fcm = require('../utils/fcm');
const LoggedUserModel = require('../models/loggedUserModel');

exports.insertUser = (req, res, next) => {
    
        try {
    
            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                uid: req.body.uid,
                username: req.body.username,
                email: req.body.email,
                date: new Date(),
                age: req.body.age,
                emergencyNumber: req.body.emergencyNumber,
                deviceToken : req.body.deviceToken
            });
    
            user.save().then(() => {
                console.log(user.deviceToken)

                fcm.sendNotification("Smart Vest", `Welcome to smart vest  ${user.username} `, user.deviceToken)
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

exports.getUser = async (req, res, next) => {

    try {
        const user = await User.find({uid: req.params.uid});
        

        res.status(200).json({
            status: "success",
            user,
        })
    } catch (e){
        res.status(500).json({
            status: "fail",
            message: e.message
        })
    }
    
}

exports.loginUser = async (req, res) => {
    try{
        const user = await User.find({uid: req.body.uid});
        const record = await new LoggedUserModel({
            uid: user[0].uid,
            username: user[0].username,
            date: new Date()
        })
        record.save().then(() => {
            res.status(200).json({
            status: "success",
            record,
            })
        })
        

    } catch (e){
        res.status(500).json({
            status: "fail",
            message: e.message
        })
    }
}