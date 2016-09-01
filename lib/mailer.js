/**
 * Created by Administrator on 2015/5/12.
 */
var nodemailer = require('nodemailer');
var Promise = require('promise')
var util = require('util')

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    auth: {
        user: 'webmg2023@163.com',
        pass: 'webmg2023'
    }
});
var exports = module.exports = {};

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

function resetPasswordData(mailto,newPassword){
    // setup e-mail data with unicode symbols
    return {
        from: 'webmg2023@163.com', // sender address
        to: mailto, // list of receivers
        subject: '登录密码已被重置', // Subject line
        text: '您的网站后台登录密码已被管理员重置!', // plaintext body
        html: util.format('<b>您的网站后台登录密码已被管理员重置!, 新密码是 %s 请注意保管或尽快修改</b>',newPassword) // html body
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