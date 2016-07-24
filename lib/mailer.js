/**
 * Created by Administrator on 2015/5/12.
 */
var nodemailer = require('nodemailer');
var Promise = require('promise')
var util = require('util')

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'iae.sdmi@gmail.com',
        pass: 'hoperun.com'
    }
});
var exports = module.exports = {};

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

function resetPasswordData(mailto,newPassword){
    // setup e-mail data with unicode symbols
    return {
        from: 'iae.sdmi@gmail.com', // sender address
        to: mailto, // list of receivers
        subject: 'IAE-Portal:Password has been reset', // Subject line
        text: 'Your password has been reset by admin', // plaintext body
        html: util.format('<b>Your password has been reset by admin, new password is %s. Please keep with care.</b>',newPassword) // html body
    }
}

// send mail with defined transport object
exports.sendMail4ResetPassword = function(mailto,newPassword){
    var promise = new Promise(function(resolve, reject){
        transporter.sendMail(resetPasswordData(mailto,newPassword), function(error, info){
            if(error){
                reject(error);
                console.log(error);
            }else{
                resolve();
                console.log('Message sent: ' + info.response);
            }
        });
    })
    return promise;
}