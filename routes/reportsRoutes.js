const app= require('express')
const ReportController = require('../controllers/ReportController')

var router = app.Router()

router.get('/report', (req, res) => { 
    res.status(200).send("report")
    console.log("report!")
});

router.get('/reportAll', ReportController.reportAll)
router.get('/reportSpecific/:spec', ReportController.reportSpecific)
        

module.exports = router