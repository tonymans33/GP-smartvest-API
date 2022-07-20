const HeartRate = require('../models/HeartRateModel')
var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");
const fire = require ('../utils/firebase');
const LoggedUserModel = require("../models/loggedUserModel");



exports.insertOneRead = async (req, res, next) => {

    try{

        req.body.status = checkStatus(req.body.read)
        req.body.date = new Date()
    
        const newHeartRate = await HeartRate.create(req.body)
    
        res.status(201).json({
            status: "success",
            data: newHeartRate,
            message: "New Heart Rate created successfully !"
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
        const heartRate = await HeartRate.find().limit(1).sort({$natural:-1})

        res.status(200).json({
            status: checkStatus(heartRate[0].read),
            read: heartRate[0].read,
        })
    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}

exports.report = async (req, res, next, options) => {

    var html = fs.readFileSync(path.resolve("assets", 'heartReport.html'),{ encoding:'utf-8' })
    const heartRate = await HeartRate.find().limit(1).sort({$natural:-1})
    const user = await LoggedUserModel.find().limit(1).sort({$natural:-1})
    const date = new Date()


    var document = {
        html: html,
        data: {
            name: user[0].username,
            heart: heartRate[0].read,
            date: date.toLocaleString(),
            },
        path: "./reportHeartRate.pdf",
        type: "",
    };

    try{
        await pdf.create(document, options).then(async () => {

            reportName = 'reportHeartRate.pdf'
            const link = await fire.uploadFile(document.path, reportName)
            console.log(link)

            res.status(201).json({
                status: "success",
                link: link,
                name: reportName,
                message: "Report created successfully !"
            })

            fs.unlinkSync(document.path)
        })
       

    }catch(e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }

}

exports.searchByDate = async (req, res, next) => {
    
    try{
        const heart = await HeartRate.find({date: req.params.date})

        res.status(200).json({
            status: "success",
            read: heart[0].read,
            message: "Heart found successfully !"
        })

    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}



const checkStatus = (read) => {
    if(read > 200){
        return "danger"
    } else if(read >= 90 && read <= 250){
        return "good"
    } else {
        return "good"
    }
}
