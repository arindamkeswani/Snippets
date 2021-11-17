const nodemailer = require("nodemailer");
const {smtp_id, smtp_pass} = require('../../secrets');
// const {nodemailer_passkey}=require('./secrets');
// https - 443 http 8080
//userObj-> name email password 
module.exports.sendMail=async function sendMail(str,data) {
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: smtp_id, // generated ethereal user
      pass: smtp_pass, // generated ethereal password
    },
  });

  var Osubject,Otext,Ohtml;
  if(str=="signup"){
    Osubject=`Thank you for signing in ${data.name}`;
    Ohtml=`
    <h1>Welcome to foodApp.com</h1>
    Hope you have a good time !
    Here are your details-
    Name - ${data.name}
    Email- ${data.email}
    `

  }
  else if(str=="resetpassword"){
    Osubject=`Reset Password`;
    Ohtml=`
    <h1>foodApp.com</h1>
    Here is your link to reset your password !
    ${data.resetPasswordLink}
    `
  }

  let info = await transporter.sendMail({
    from: '"FoodApp 🍱" <arindamkeswani@gmail.com>',// sender address <${userObj.email}>
    to: data.email, // list of receivers
    subject: Osubject, // Subject line
    // plain text body
    html: Ohtml, // html body
  });
  console.log("Message sent: %s", info.messageId);
};