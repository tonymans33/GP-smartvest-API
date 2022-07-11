var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");
const fire = require ('../utils/firebase');
const HeartRateController = require('./HeartRateController')
const TempController = require('./TempController')
const OxyController = require('./OxyController')
const Temp = require('../models/TempModel')
const Oxy = require('../models/OxyModel')
const HeartRate = require('../models/HeartRateModel');
const LoggedUserModel = require("../models/loggedUserModel");

// Read HTML Template
var options = {
    format: "A5",
    orientation: "portrait",
    border: "10mm",
};

exports.reportAll = async (req, res, next) => {

    try{

        var html = fs.readFileSync(path.resolve("assets", 'allReport.html'),{ encoding:'utf-8' });

        const heartRate = await HeartRate.find().limit(1).sort({$natural:-1})
        const temp = await Temp.find().limit(1).sort({$natural:-1})
        const oxy = await Oxy.find().limit(1).sort({$natural:-1})
        const user = await LoggedUserModel.find().limit(1).sort({$natural:-1})
        const date = new Date()

        var document = {
            html: html,
            data: {
              name: user[0].username,
              temp: temp[0].read,
              heart: heartRate[0].read,
              oxy: oxy[0].read,
              date: date.toLocaleString(),
            },
            path: "./reportAll.pdf",
            type: "",
          }

        await pdf.create(document, options).then(async () => {

            reportName = 'reportAll.pdf'
            const link = await fire.uploadFile(document.path, reportName)

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

exports.reportSpecific = (req, res, next) => {

    const spec = req.params.spec

    switch(spec){
        case 'heart':
            HeartRateController.report(req, res, next, options)
            break
        case 'temp':
            TempController.report(req, res, next, options)
            break
        case 'oxy':
            OxyController.report(req, res, next, options)
            break
        default:
            this.reportAll(req, res, next)
    }
}

