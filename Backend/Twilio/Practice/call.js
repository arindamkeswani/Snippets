require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: process.env.RECEIVER_NUMBER_2,
    from: "+12569260850" //process.env.SENDER_NUMBER
}, function(err,call){
    if(err){
        console.log(err);
    }else{
        console.log(call.sid);
    }
}
)