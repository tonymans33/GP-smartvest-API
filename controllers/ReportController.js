var pdf = require("pdf-creator-node")
var fs = require("fs");
var path = require("path");

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
    path: "./output.pdf",
    type: "",
  };


exports.reportAll = (req, res, next) => {

    try{
        pdf.create(document, options)

        res.status(201).json({
            status: "success",
            message: "Report created successfully !"
        })

    }catch(e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }

}

exports.reportSpecific = (req, res, next) => {

    try{
        pdf.create(document, options)

        res.status(201).json({
            status: "success",
            message: "Report created successfully !"
        })

    }catch(e){
        res.status(400).json({
            status: "fail",
            message: e.message
        })
    }

}