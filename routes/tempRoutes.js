const app= require('express')
const TempController = require('../controllers/TempController')

var router = app.Router();

router.get('/temp', (req, res) => { 
    res.status(200).send("temp")
    console.log("temp!")
});

router.post('/insertTemp', TempController.insertOneRead);
router.get('/getLatestRead', TempController.getLatestRead)
router.get('/searchByDate/:date', TempController.searchByDate)
router.get('/getLatestReads', TempController.getReads)

        

module.exports = router