const Battery = require('../models/BatteryModel')


exports.insertOneRead = async (req, res, next) => {

    try{

        req.body.read = Math.abs(req.body.read)
        req.body.status = checkStatus(req.body.read)
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

const checkStatus = (read) => {
    if(read > 100){
        return "danger"
    } else if(read > 80){
        return "warning"
    } else {
        return "good"
    }
}
