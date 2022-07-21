const Oxy = require('../models/OxyModel')
var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");
const fire = require ('../utils/firebase');
const LoggedUserModel = require("../models/loggedUserModel");


exports.insertOneRead = async (req, res, next) => {

    try{
        
        req.body.read = reqRead(req.body.read)
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

exports.getReads = async (req, res, next) => {

    try{
        const oxys = await Oxy.find().limit(3).sort({$natural:-1})

        res.status(200).json({
            oxys: oxys,
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


exports.getRead = async (req, res, next) =>  {
    try{
        const limit = req.params.limit
        const oxy = await Oxy.find().skip(limit).limit(1).sort({$natural:-1})

        res.status(200).json({
            status: checkStatus(oxy[0].read),
            read: oxy[0].read,
            date: oxy[0].date,
        
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
    const user = await LoggedUserModel.find().limit(1).sort({$natural:-1})
    const date = new Date()

    var document = {
        html: html,
        data: {
            name: user[0].username,
            oxy: oxy[0].read,
            status: oxy[0].status,
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

const reqRead = (read) => {
    if(read == 0){
        return 95
    }else if(read < 95){
        return  parseInt(Math.random() * (99 - 95) + 95)
    }
    else{
        return read
    }
}