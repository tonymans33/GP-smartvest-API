const app= require('express')
const UserController = require('../controllers/UserController')

var router = app.Router();

router.get('/user', (req, res) => { 
    res.status(200).send("user")
    console.log("temp!")
});

router.post('/insertUser', UserController.insertUser);
router.get('/getUser/:uid', UserController.getUser);
router.post('/loginUser', UserController.loginUser);

        
 
module.exports = router