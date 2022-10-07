var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'utscclubhouse@gmail.com',
    pass: process.env.EMAIL_PASS
  }
});

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