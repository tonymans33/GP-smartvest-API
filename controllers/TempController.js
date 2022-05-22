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

const checkStatus = (read) => {
    if(read > 32){
        return "danger"
    } else if(read > 31){
        return "warning"
    } else {
        return "good"
    }
}
