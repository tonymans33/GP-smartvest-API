const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "3525db98",
  apiSecret: "Bj6BW2NwV28yXzSo",
})

const from = "Smart vest"
const to = "201154569204"

exports.sendSms = (text) => {
    vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if(responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })
}

