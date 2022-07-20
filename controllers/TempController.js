const Temp = require('../models/TempModel')
const fcm = require('../utils/fcm')
var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");
const fire = require ('../utils/firebase')
const LoggedUserModel = require("../models/loggedUserModel")
const vonage = require('../utils/vonage')


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
            status: checkStatus(temp[0].read),
            read: temp[0].read,
            
        })
    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}

exports.searchByDate = async (req, res, next) => {
    
        try{
            const temp = await Temp.find({date: req.params.date})
    
            res.status(200).json({
                status: "success",
                read: temp[0].read,
                message: "Temp found successfully !"
            })
    
        } catch (e){
            res.status(400).json({
                status: "fail",
                message: e.message
            })
        }
}


exports.report = async (req, res, next, options) => {

    var html = fs.readFileSync(path.resolve("assets", 'tempReport.html'),{ encoding:'utf-8' });
    const temp = await Temp.find().limit(1).sort({$natural:-1})
    const user = await LoggedUserModel.find().limit(1).sort({$natural:-1})

    const date = new Date()

    var document = {
        html: html,
        data: {
        name: user[0].username,
        temp: temp[0].read,
        date : date.toLocaleString(),
        },
        path: "./reportTemp.pdf",
        type: "",
    };


    try{
        await pdf.create(document, options).then(async () => {

            reportName = 'reportTemp.pdf'
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


const checkStatus = (read) => {

    fcm.sendNotification("Temperature", `Your temperature is  ${read} %`, 'ddTCNIVgT3eI4tN55H8KSm:APA91bEKZwf3RdPEtQBRZuqWOWqJ0qldKm1Xi3w_qc8e8971a7wGo8_c24x22ySnmzV-4JFizX4Jx98IaKMfUuvXld82JBoxBL2Ix-PV-b5WaQuCaYFMYybden2GmwXnQjMR0SH0bSvM', 'https://upload.wikimedia.org/wikipedia/commons/5/5e/ThermometerHighTemp.png')
    
    if(read >= 40){
        // vonage.sendSms()
        vonage.makeCall()
        return "danger"
    } else if(read > 38.8){
        return "warning"
    } else if(read >= 36.5 && read <= 37.4) {
        return "good"
    } else{
        return "warning"
    }
}
