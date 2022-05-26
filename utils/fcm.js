const  FCM = require('fcm-node');
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});

const  serverKey = process.env.FIREBASE_SERVER_KEY
const  fcm = new FCM(serverKey);


exports.sendNotification = (title, messageBody, deviceToken, image = null) => {

    const message = {
        to: deviceToken,
        notification: {
            title: title,
            image: image,
            body: messageBody,
        }
    }

    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!"+err)
            console.log("Response :! "+ response);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    
    })
}



