
var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var utilsController = require('./utils')
var adminService = require('../../service/admin/admin')

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
exports.loginGet = function (req, res, next) {
    res.render('admin/login', {});
}
exports.loginPost = function (req, res, next) {
    let username = req.body['username']
    let password = req.body['password']

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
    res.redirect('/admin/login')
}
exports.searchGet = function (req, res, next) {
    res.render4admin('admin/search', {req});
}
exports.resGet = function (req, res, next) {
    res.render4admin('admin/res', {req});
}