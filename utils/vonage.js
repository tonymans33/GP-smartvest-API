const Vonage = require('@vonage/server-sdk')
const { path } = require('../app')

const vonage = new Vonage({
  apiKey: "c8b3ea92",
  apiSecret: "BimL5trVJZBFmCfy",
  applicationId: "515c43a5-7263-4016-bdba-7602d26d8754",
  privateKey: './vonagePrivate.key'
})

const from = "Smart vest"
const to = "201154569204"
const text = 'a7a'


exports.sendSms = () => {
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

exports.makeCall= () => {
    vonage.calls.create({
        to: [{
          type: 'phone',
          number: "201154569204"
        }],
        from: {
          type: 'phone',
          number: "201154569204"
        },
        ncco: [{
          "action": "talk",
          "text": "This is a text to speech call from Vonage"
        }]
      }, (error, response) => {
        if (error) console.error(error)
        if (response) console.log(response)
      })
}