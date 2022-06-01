const Temp = require('../models/TempModel')
const fcm = require('../utils/fcm')
var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");
const fire = require ('../utils/firebase');

var html = fs.readFileSync(path.resolve("assets", 'templateAll.html'),{ encoding:'utf-8' });

var options = {
    format: "A5",
    orientation: "portrait",
    border: "10mm",
    header: {
        height: "45mm",
        contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
    },
    footer: {
        height: "28mm",
        contents: {
            first: 'Cover page',
            2: 'Second page', // Any page number is working. 1-based index
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
            last: 'Last Page'
        }
    }
};

var users = [
    {
      name: "Shyam",
      age: "26",
    },
    {
      name: "Navjot",
      age: "26",
    },
    {
      name: "Vitthal",
      age: "26",
    },
  ];

  var document = {
    html: html,
    data: {
      users: users,
    },
    path: "./reportTemp.pdf",
    type: "",
  };


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
            read: temp[0].read,
        })
    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}

exports.report = async (req, res, next) => {

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
        return "danger"
    } else if(read > 38.8){
        return "warning"
    } else if(read >= 36.5 && read <= 38.4) {
        return "good"
    } else{
        return "undefined"
    }
}
