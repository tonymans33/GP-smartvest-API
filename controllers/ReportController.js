var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");
const fire = require ('../utils/firebase');
const HeartRateController = require('./HeartRateController')
const TempController = require('./TempController')
const OxyController = require('./OxyController')

// Read HTML Template
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
    path: "./reportAll.pdf",
    type: "",
  };


exports.reportAll = async (req, res, next) => {

    try{
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
            HeartRateController.report(req, res, next)
            break
        case 'temp':
            TempController.report(req, res, next)
            break
        case 'oxy':
            OxyController.report(req, res, next)
            break
        default:
            this.reportAll(req, res, next)
    }
}