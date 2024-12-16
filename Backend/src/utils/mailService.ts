// import nodemailer from 'nodemailer';
const nodemailer = require('nodemailer');

// Create a transporter object using Gmail service
let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nayanph1@gmail.com', // your Gmail address
    pass: 'pyde jsuq jvua dcig', // your Gmail app password (not your Gmail password)
  },
});

// Set up email data
export let mailOptions = {
  from: 'naayaankumar@gmail.com', // sender address
  to: 'naayaankumar@gmail.com', // list of receivers
  subject: 'Hello from node backend', // Subject line
  text: 'This is a test email sent from nayan kumar pls dont reply!', // plain text body
  html: 'task summary', // HTML body (optional)
};

// "05:00" '5:00pm'

export default transporter;
