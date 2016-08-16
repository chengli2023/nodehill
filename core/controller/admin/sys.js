
var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var utilsController = require('./utils')
var adminService = require('../../service/admin/admin')
var menuService = require('../../service/admin/menu')
var adminModel = require('../../models/admin/Admin')
var menuModel = require('../../models/admin/Menu')
var roleModel = require('../../models/admin/Role')

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
        let allRes = yield menuModel.findAllMenus({roleids:currRole.roleids})

        res.render4admin('admin/sys/res', {
            req,
            allRes
        });
    }).catch(function(e){
        next(e)
    });

},
exports.checkSameLevelOrderGet = function (req, res, next) {
    co(function* (){
        let res_order = req.query['res_order']
        let res_pid = req.query['res_pid']

        let menuObj = yield menuModel.findOne({
            where:{pid:res_pid,order:res_order}
        })
        if(menuObj){
            res.json(false)
        }else{
            res.json(true)
        }
    }).catch(function(e){
        next(e)
    });
},
exports.resAddPost = function (req, res, next) {
    co(function* (){
        let name = req.body['res_name']
        let pid = req.body['res_pid']
        let url = req.body['res_url']
        let restype = req.body['res_type']
        let desc = req.body['res_desc']
        let order = req.body['res_type']
        let icon = req.body['res_icon']

        let menuObj = yield menuModel.createRes({name,pid,url,restype,desc,order,icon})
        if(menuObj){
            res.json({})
        }
    }).catch(function(e){
        res.json({error:'添加失败,'+ e.message})
        logger.error(e)
    });

}

exports.roleGet = function (req, res, next) {
    co(function* (){
        let roleObjs = yield roleModel.findAll()
        res.render4admin('admin/sys/role', {
            req,
            roleObjs
        });
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.checkSameNameGet = function (req, res, next) {
    co(function* (){
        let rolename = req.query['role_name']
        let roleObj = yield roleModel.findOne({where:{rolename}})
        if(roleObj){
            res.json(false)
            return;
        }
        res.json(true)
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.roleAddPost = function (req, res, next) {
    co(function* (){
        let rolename = req.body['role_name']
        let roledesc = req.body['role_desc']
        let roleObj = yield roleModel.create({rolename,roledesc})
        if(roleObj){
            res.json({})
        }
    }).catch(function(e){
        res.json({error:'添加失败,'+ e.message})
        logger.error(e)
    });

}
exports.roleDelGet = function (req, res, next) {
    co(function* (){
        let roleId = req.query['roleId']
        let roleObj = yield roleModel.destroy({where:{id:roleId}})
        if(roleObj != 0){
            res.json({})
            return;
        }
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.roleEditPost = function (req, res, next) {
    co(function* (){
        let rolename = req.query['role_name']
        let roleObj = yield roleModel.findOne({where:{rolename}})
        if(roleObj){
            res.json(false)
            return;
        }
        res.json(true)
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.aclGet = function (req, res, next) {
    co(function* (){
        let roleId = req.query['roleId']

        let currRole  = yield utilsController.getCurrRole(req)
        let hasRes = yield menuModel.findAllMenus({roleids:currRole.roleids})
        let allRes = yield menuModel.findAll()
        allRes =  menuService.resSorter(allRes,0,0)

        for(let i = 0; i < allRes.length; i++){
            let resObj = allRes[i]
            for(let i = 0; i < hasRes.length; i++){
                if(resObj.id == hasRes[i].id){
                    resObj.isHas = true;
                }else{
                    resObj.isHas = false;
                }
            }
        }
        res.json(allRes)
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
