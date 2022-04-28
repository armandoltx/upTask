const nodemailer = require('nodemailer');
const pug = require('pug');
const juice = require('juice');
const htmlToText = require('html-to-text');
const util = require('util');
const emailConfig = require('../config/email');

// create reusable transporter object using the default SMTP transport
let transport = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

// generar HTML
const generarHTML = () => {
  //__dirname detecta la url o la ubicacion donde estamos.
  const html = pug.renderFile(`${__dirname}/../views/emails/reestablecer-password.pug`);
  return juice(html);
}

// send mail with defined transport object
let info = transport.sendMail({
  from: '"UpTask" <no-reply@example.com>', // sender address
  to: "correo@correo.com", // list of receivers
  subject: "Password Reset", // Subject line
  text: "Hello world?", // plain text body
  html: generarHTML()
});