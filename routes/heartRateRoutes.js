const app= require('express')
const HeartRateController = require('../controllers/HeartRateController')

var router = app.Router();

router.get('/heartRate', (res) => { 
    res.status(200).send("heartRate")
    console.log("heartRate!")
});

router.post('/insertHeartRate', HeartRateController.insertOneRead)
router.get('/getLatestRead', HeartRateController.getLatestRead)
router.get('/searchByDate/:date', HeartRateController.searchByDate)
router.get('/getLatestReads', HeartRateController.getReads)

  

module.exports = router