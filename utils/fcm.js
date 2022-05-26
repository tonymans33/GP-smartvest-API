const  FCM = require('fcm-node');
const  serverKey = 'AAAAwWU2JRA:APA91bFoKKj0mRDepc6MkdShAEQV98DVWueqx6kU8UZC7QHbIhlgGyH2s2gHdSxvpyTnyVLRunWVWmC_IDC5kYKKaWSQaOSLLTZu6LJ8ATtPd1uj3eDqibmq39pecFVZL-F6oR8S47yo';
const  fcm = new FCM(serverKey);


exports.sendNotification = (messageBody, deviceToken, image = null) => {

    const message = {
        to: deviceToken,
        notification: {
            title: 'Smart Vest',
            image: image,
            body: messageBody,
        }
    }

    fcm.send(message, function(err, response) {
        if (err) {
            console.log("Something has gone wrong!"+err)
            console.log("Respponse:! "+response);
        } else {
            console.log("Successfully sent with response: ", response);
        }
    
    })
}



