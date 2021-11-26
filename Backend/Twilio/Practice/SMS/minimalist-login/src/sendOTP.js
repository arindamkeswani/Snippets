let otp = require("./loginScript")

require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({body: `Your OTP is: ${otp}`, from: process.env.SENDER_NUMBER, to: process.env.RECEIVER_NUMBER})
      .then(message => console.log(message.sid));