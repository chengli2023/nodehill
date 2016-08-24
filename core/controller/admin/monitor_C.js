
var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');


var utilsController = require('./utils_C')

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

exports.interfaceGet = function (req, res, next) {
    res.render4admin('admin/monitor/interface', {
        req
    });
}
exports.serverGet = function (req, res, next) {
    res.render4admin('admin/monitor/server', {
        req
    });
}