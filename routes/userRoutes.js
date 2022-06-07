const app= require('express')
const UserController = require('../controllers/UserController')

var router = app.Router();

router.get('/user', (req, res) => { 
    res.status(200).send("user")
    console.log("temp!")
});

router.post('/insertUser', UserController.insertUser);

        
 
module.exports = router