const Temp = require('../models/TempModel')


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
        const temo = await Temp.find().limit(1).sort({$natural:-1})

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
