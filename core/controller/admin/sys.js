
var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var utilsController = require('./utils')
var adminService = require('../../service/admin/admin')
var adminModel = require('../../models/admin/Admin')

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

exports.resGet = function (req, res, next) {
    co(function* (){
        let currRole  = yield utilsController.getCurrRole(req)
        let menus = yield adminModel.findAllMenus({rootid:-1,roleids:currRole.roleids})
        res.render4admin('admin/sys/res', {
            req,
            menus
        });
    }).catch(function(e){
        next(e)
    });

}