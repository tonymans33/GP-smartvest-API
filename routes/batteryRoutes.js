const app= require('express')
const BatteryController = require('../controllers/BatteryController')

var router = app.Router()

router.get('/battery', (req, res) => { 
    res.status(200).send("battery")
    console.log("battery!")
});

router.post('/insertBattery', BatteryController.insertOneRead)
router.get('/getLatestRead', BatteryController.getLatestRead)
        

module.exports = router