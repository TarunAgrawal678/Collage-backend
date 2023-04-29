var otpGenerator = require('otp-generator');
const OTP = require('../models/otp.model');
const nodemailer = require('nodemailer');
const {encode} = require("../middlewares/crypt")
require('dotenv').config();

module.exports = {
  sendOTP
};

// To add minutes to the current time
function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes*60000);
}

async function sendOTP(requestBody){
  const email=requestBody.email;
  const type= requestBody.type;
  let email_subject, email_message;

  if(!email){
    const response={"Status":"Failure","Details":"Email not provided"};
    throw response; 
  }
  // if(!type){
  //   const response={"Status":"Failure","Details":"Type not provided"}
  //   return res.status(400).send(response) 
  // }

  const otp = otpGenerator.generate(6, { alphabets: false, upperCase: false, specialChars: false });
  const now = new Date();
  const expiration_time = AddMinutesToDate(now,10);
  const body={
    otp: otp,
    expiration_time: expiration_time
  }
  const OTPModel = new OTP(body);
  await OTPModel.save()
  const details={
    "timestamp": now, 
    "check": email,
    "success": true,
    "message":"OTP sent to user",
    "otp_id": 1
  }
  email_message=otp;
  email_subject='Test email';

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: `${process.env.EMAIL_ADDRESS}`,
      pass: `${process.env.EMAIL_PASSWORD}`
    },
  });
  const mailOptions = {
    from: `"Tarun Agrawal"<${process.env.EMAIL_ADDRESS}>`,
    to: `${email}`,
    subject: email_subject,
    text: email_message ,
  };
  await transporter.verify();
  let message;
  await transporter.sendMail(mailOptions, (err, response) => {
    // console.log(err);
    if (err) {
        throw {"Status":"Failure","Details": err };
    } else {
      message= {message:"OTP send successfully"};
    }
  });
  return message;
}

async function verifyOTP(requestBody){

}
