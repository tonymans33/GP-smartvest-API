const Oxy = require('../models/OxyModel')


exports.insertOneRead = async (req, res, next) => {

    try{

        req.body.status = checkStatus(req.body.read)
        req.body.date = new Date()
    
        const newOxy = await Oxy.create(req.body)
    
        res.status(201).json({
            status: "success",
            data: newOxy,
            message: "New Oxy created successfully !"
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
