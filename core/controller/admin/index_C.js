
var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var utilsController = require('./utils_C')
var adminService = require('../../service/admin/admin_S')
var adminModel = require('../../models/admin/Admin_M')

var verifyCode = require('verify-code');
var httpAgent = require('../../../lib/httpAgent')({})
exports = module.exports = function(handle){
    //var opts = options || {};
    function handler(req,res,next){
        handler._req = req;
        handler._res = res;
        handler._next = next;
        handle.bind(handler)(req,res,next);
    }
    handler.__proto__ = exports;
    return handler;
};
var genVerifyCode=function(req){
    var result = verifyCode.Generate();
    var vcode = result.code;
    var imgDataURL = result.dataURL;
    req.session.verifyCode = vcode;
    req.session.verifyCodeExpires = Date.now() + 1000 * 120;//两分钟后过期
    return imgDataURL;
}
exports.loginGet = function (req, res, next) {
    let vCodeImg = genVerifyCode(req);
    res.render('admin/login', {
        verifyCode:vCodeImg
    });
}
exports.refreshVerifyCodeGet = function (req, res, next) {
    res.json({verifyCode:genVerifyCode(req)})
}
exports.loginPost = function (req, res, next) {
    if(req.session.verifyCodeExpires < Date.now()){
        res.json({error: '验证码已过期'});
        return;
    }
    let username = req.body['username']
    let password = req.body['password']
    let verifyCode = req.body['verifyCode']
    if(req.session.verifyCode.toLowerCase()!=verifyCode.toLowerCase()){
        res.json({error: '验证码错误'});
        return;
    }

    co(function* (){
        let adminObj = yield adminService.findOne({username,password})
        if(adminObj){
            utilsController.saveAdminLoginSession(req,{
                id:adminObj.id,
                username:adminObj.username
            })
            res.json({});
        }else{
            res.json({error: '用户名或密码不正确'});
        }
    }).catch(function(e){
        next(e)
    });

}
exports.logoutGet = function (req, res, next) {
    utilsController.clearAdminLoginSession(req)
    res.clearCookie('personId',{ path: '/admin'})//TODO:chengli
    res.redirect('/admin/login')
}
exports.homeGet = function (req, res, next) {
    res.render4admin('admin/home', {req});
}

exports.profileGet = function (req, res, next) {
    // let userId = utilsController.getAdminSession().id
    // let userObj = adminModel.findOne({where:{id:userId},attributes:['username','email']})

    res.render4admin('admin/profile', {
        req
    });
}
exports.userCheckSameEmailGet = function (req, res, next) {
    let self = this;
    co(function* (){
        let userId = utilsController.getAdminSession(req).id
        let email = req.query['user_email']
        let count = yield adminModel.count({where:{email:email,id:{$ne:userId}}})
        res.json(count<1)
    }).catch(function(e){
        res.json(false)
        logger.error(e)
    });
}
var checkPassword = function(userId,password){
    return co(function* (){
        let count = yield adminModel.count({where:{password:password,id:userId}})
        return count>0
    })
}
exports.checkPasswordGet = function (req, res, next) {
    co(function* (){
        let b = yield checkPassword(utilsController.getAdminSession(req).id,req.query['profile_password'])
        res.json(b)
    }).catch(function(e){
        res.json(false)
        logger.error(e)
    });
}
exports.updateEmailPost = function (req, res, next) {
    let self = this;
    co(function* (){
        let userId = utilsController.getAdminSession(req).id
        let email = req.body['user_email']
        let password = req.body['password']
        let check = yield checkPassword(userId,password);
        if(!check){
            res.json({error:'密码错误'})
            return;
        }
        yield adminModel.update({email},{where:{id:userId}})
        res.json({})
    }).catch(function(e){
        res.json({error:e.message})
        logger.error(e)
    });
}
exports.updatePasswordPost = function (req, res, next) {
    let self = this;
    co(function* (){
        let userId = utilsController.getAdminSession(req).id
        let oldPassword = req.body['old_password']
        let newPassword = req.body['new_password']
        let check = yield checkPassword(userId,oldPassword);
        if(!check){
            res.json({error:'密码错误'})
            return;
        }
        yield adminModel.update({password:newPassword},{where:{id:userId}})
        //清除session,强制重新登录
        utilsController.clearAdminLoginSession(req)
        res.json({})
    }).catch(function(e){
        res.json({error:e.message})
        logger.error(e)
    });
}
