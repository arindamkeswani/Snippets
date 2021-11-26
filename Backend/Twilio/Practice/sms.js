require('dotenv').config();

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
      .create({body: 'Test message from Arindam', from: '+12569260850', to: '+919999508409'})
      .then(message => console.log(message.sid));