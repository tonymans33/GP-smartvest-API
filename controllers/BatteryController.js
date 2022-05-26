const Battery = require('../models/BatteryModel')
const fcm = require('../utils/fcm')


exports.insertOneRead = async (req, res, next) => {

    try{

        req.body.read = Math.abs(req.body.read)
        req.body.status = checkStatus(Math.floor(req.body.read))
        req.body.date = new Date()
    
        const newBattery = await Battery.create(req.body)
    
        res.status(201).json({
            status: "success",
            data: newBattery,
            message: "New Battery created successfully !"
        })

    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    } 
}

exports.getLatestRead = async (req, res, next) => {

    try{
        const battery = await Battery.find().limit(1).sort({$natural:-1})

        res.status(200).json({
            status: "success",
            data: battery,
        })
    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}

const checkStatus = (read) => {
    if(read > 0){
        fcm.sendNotification(`Battery is low! ${read} %`, 'ddTCNIVgT3eI4tN55H8KSm:APA91bEKZwf3RdPEtQBRZuqWOWqJ0qldKm1Xi3w_qc8e8971a7wGo8_c24x22ySnmzV-4JFizX4Jx98IaKMfUuvXld82JBoxBL2Ix-PV-b5WaQuCaYFMYybden2GmwXnQjMR0SH0bSvM', 'https://i.dlpng.com/static/png/6415079_preview.png')
        return "danger"
    }
    //  else if(read > 38.8){
    //     return "warning"
    // } else if(read >= 36.5 && read <= 38.4) {
    //     return "good"
    // } else{
    //     return "undefined"
    // }
}