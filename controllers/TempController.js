const Temp = require('../models/TempModel')
const fcm = require('../utils/fcm')


exports.insertOneRead = async (req, res, next) => {

    try{

        req.body.status = checkStatus(req.body.read)
        req.body.date = new Date()  
    
        const newTemp = await Temp.create(req.body)
    
        res.status(201).json({
            status: "success",
            data: newTemp,
            message: "newTemp created successfully !"
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
        const temp = await Temp.find().limit(1).sort({$natural:-1})

        res.status(200).json({
            status: "success",
            data: temp,
        })
    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}


const checkStatus = (read) => {

    fcm.sendNotification("Temperature", `Your temperature is  ${read} %`, 'ddTCNIVgT3eI4tN55H8KSm:APA91bEKZwf3RdPEtQBRZuqWOWqJ0qldKm1Xi3w_qc8e8971a7wGo8_c24x22ySnmzV-4JFizX4Jx98IaKMfUuvXld82JBoxBL2Ix-PV-b5WaQuCaYFMYybden2GmwXnQjMR0SH0bSvM', 'https://upload.wikimedia.org/wikipedia/commons/5/5e/ThermometerHighTemp.png')
    
    if(read >= 40){
        return "danger"
    } else if(read > 38.8){
        return "warning"
    } else if(read >= 36.5 && read <= 38.4) {
        return "good"
    } else{
        return "undefined"
    }
}
