/**
 * @module emailWrapper
 */

var nodemailer = require('nodemailer');
const SMTPTransport = require('nodemailer/lib/smtp-transport');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'utscclubhouse@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Send an email made from given object
 * @param {Object} emailObj Object with email configurations - see https://nodemailer.com/message/ 
 * @returns {Promise<SMTPTransport.SentMessageInfo>} Info about sent email as returned by sendMail()
 */
module.exports.sendEmail = function (emailObj) {
  return new Promise( (res, rej) => {
      transporter.sendMail(emailObj, function(error, info){
          if (error) {
            rej(error);
          } else {
            res(info)
          }
      });
  });
}