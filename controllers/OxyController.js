const Oxy = require('../models/OxyModel')
var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");
const fire = require ('../utils/firebase');

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


exports.getLatestRead = async (req, res, next) => {

    try{
        const oxy = await Oxy.find().limit(1).sort({$natural:-1})

        res.status(200).json({
            status: checkStatus(oxy[0].status),
            read: oxy[0].read,
            message: "oxy retrieved successfully !"

        })
    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}

exports.report = async (req, res, next, options) => {

    var html = fs.readFileSync(path.resolve("assets", 'oxyReport.html'),{ encoding:'utf-8' });
    const oxy = await Oxy.find().limit(1).sort({$natural:-1})
    const date = new Date()

    var document = {
        html: html,
        data: {
            name: "Tony Mansour Grant",
            oxy: oxy[0].read,
            date: date.toLocaleString(),
            },
        path: "./reportOxy.pdf",
        type: "",
    };


    try{
        await pdf.create(document, options).then(async () => {

            reportName = 'reportOxy.pdf'
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
        const oxy = await Oxy.find({date: req.params.date})

        res.status(200).json({
            status: "success",
            read: oxy[0].read,
            message: "oxy found successfully !"
        })

    } catch (e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }
}


const checkStatus = (read) => {
    if(read < 94){
        return "warning"
    } else if(read > 94 && read < 100){
        return "good"
    } else {
        return "danger"
    }
}
