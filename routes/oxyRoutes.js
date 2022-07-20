const app= require('express')
const OxyController = require('../controllers/OxyController')

var router = app.Router();

router.get('/oxy', (req, res) => { 
    res.status(200).send("oxy")
    console.log("oxy!")
});

router.post('/insertOxy', OxyController.insertOneRead);
router.get('/getLatestRead', OxyController.getLatestRead)
router.get('/searchByDate/:date', OxyController.searchByDate)
router.get('/getLatestReads', OxyController.getReads)


        

module.exports = router