var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var mailer = require('../../../lib/mailer')
var utilsController = require('./utils_C')
var adminService = require('../../service/admin/admin_S')
var menuService = require('../../service/admin/menu_S')
var adminModel = require('../../models/admin/Admin_M')
var menuModel = require('../../models/admin/Menu_M')
var roleModel = require('../../models/admin/Role_M')

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

}
exports.checkSameNameInResGet = function (req, res, next) {
    let self = this;
    co(function* (){
        let res_name = req.query['res_name']
        let res_pid = req.query['res_pid']
        let resId = req.query['resId']
        let b  = yield self.checkSameInRes({res_name,res_pid,resId});
        res.json(b)
    }).catch(function(e){
        next(e)
    });
}
exports.checkSameInRes=function({resId,res_pid,res_name}){
    return co(function*(){
        let count = 0;
        if(resId){//编辑校验
            count = yield menuModel.count({
                where:{pid:res_pid,name:res_name,id:{$ne:resId}}
            })
        }else{
            count = yield menuModel.count({
                where:{pid:res_pid,name:res_name}
            })
        }
        if(count > 0) return false;
        return true;
    })
}
exports.resDelGet = function (req, res, next) {
    co(function* (){
        let resId = req.query['resId']
        let roleObj = yield menuModel.destroy({where:{id:resId}})
        if(roleObj != 0){
            res.json({})
            return;
        }
    }).catch(function(e){
        next(e)
        logger.error(e)
    });
}
exports.resDetailGet = function (req, res, next) {
    co(function* (){
        let resId = req.query['resId']

        let menuObj = yield menuModel.findOne({where:{id:resId}})
        if(!menuObj){
            res.json({error:'该资源已经不存在'})
            return;
        }
        res.json(menuObj)
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}

exports.resEditPost = function (req, res, next) {
    let self = this;
    co(function* (){
        let resId = req.body['resId']
        let name = req.body['res_name']
        let pid = req.body['res_pid']
        let url = req.body['res_url']
        let restype = req.body['res_type']
        let desc = req.body['res_desc']
        let order = req.body['res_order']
        let icon = req.body['res_icon']
        //校验
        let b = yield self.checkSameInRes({res_name:name,res_pid:pid,resId});
        if(!b) throw Error('校验失败')

        let updatedArr = yield menuModel.update({name,pid,url,restype,desc,order,icon},{where:{id:resId}})
        if(updatedArr.length>0){
            res.json({})
            return;
        }
    }).catch(function(e){
        res.json({error:'更新失败,'+ e.message})
        logger.error(e)
    });
}
exports.resAddPost = function (req, res, next) {
    let self = this;
    co(function* (){
        let name = req.body['res_name']
        let pid = req.body['res_pid']
        let url = req.body['res_url']
        let restype = req.body['res_type']
        let desc = req.body['res_desc']
        let order = req.body['res_order']
        let icon = req.body['res_icon']

        //校验
        let b = yield self.checkSameInRes({res_name:name,res_pid:pid,resId:null});
        if(!b) throw Error('校验失败')

        yield menuService.createRes({name,pid,url,restype,desc,order,icon})

        res.json({})
    }).catch(function(e){
        res.json({error:'添加失败,'+ e.message})
        logger.error(e)
    });

}

exports.roleGet = function (req, res, next) {
    co(function* (){
        let roleObjs = yield roleModel.findAll()
        let allRes = yield menuModel.findAll()
        allRes =  menuModel.resSorter(allRes,0,0)
        res.render4admin('admin/sys/role', {
            req,
            roleObjs,
            allRes
        });
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.roleCheckSameNameGet = function (req, res, next) {
    co(function* (){
        let rolename = req.query['role_name']
        let roleId = req.query['roleId']

        let roleObj = null;
        if(isNaN(roleId)){
            roleObj = yield roleModel.findOne({where:{rolename}})
        }else{
            roleObj = yield roleModel.findOne({where:{rolename,id:{$ne:roleId}}})
        }
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
        let roleId = req.body['roleId']
        let rolename = req.body['role_name']
        let roledesc = req.body['role_desc']
        let updatedArr = yield roleModel.update({rolename,roledesc},{where:{id:roleId}})
        if(updatedArr.length>0){
            res.json({})
            return;
        }
        res.json({error:'更新失败'})
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.aclGet = function (req, res, next) {
    co(function* (){
        let roleId = req.query['roleId']

        let hasRes = yield menuModel.findAllMenus({roleids:[roleId]})

        res.json(hasRes)
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.aclSetPost = function (req, res, next) {
    co(function* (){
        let checkedMenuIdList = req.body['checkedList']
        checkedMenuIdList = checkedMenuIdList?checkedMenuIdList.split(','):[]
        let roleIdWillSet = req.body['roleIdWillSet']
        
        yield roleModel.deleteCurrRoleAllRes({resids:checkedMenuIdList,roleIdWillSet:roleIdWillSet})
        res.json({})
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.roleDetailGet = function (req, res, next) {
    co(function* (){
        let roleId = req.query['roleId']

        let roleObj = yield roleModel.findOne({where:{id:roleId}})
        if(!roleObj){
            res.json({error:'该角色已经不存在'})
            return;
        }
        res.json(roleObj)
    }).catch(function(e){
        next(e)
        logger.error(e)
    });

}
exports.userGet = function (req, res, next) {
    co(function* (){
        let users = yield adminModel.findAll({
            include: [{
                model: roleModel
            }]
        });
        let allRole = yield roleModel.findAll();
        res.render4admin('admin/sys/user', {
            req,
            users,
            allRole
        });
    }).catch(function(e){
        next(e)
    });
}
exports.userCreatePost = function (req, res, next) {
    co(function* (){
        let username = req.body['user_name']
        let email = req.body['user_email']
        let roleIds = req.body['roleIds'].split(',')
        if(!roleIds || !Array.isArray(roleIds)){//TODO
            res.json({error:'用户必须要有角色'})
            return;
        }
        yield adminService.createUser({username,email,roleIds})
        res.json({})
    }).catch(function(e){
        next(e)
    });
}
exports.userEditPost = function (req, res, next) {
    co(function* (){
        let username = req.body['user_name']
        let email = req.body['user_email']
        let roleIds = req.body['roleIds'].split(',')
        let userId = req.body['userId']
        if(!roleIds || !(roleIds instanceof Array)){//TODO
            res.json({error:'用户必须要有角色'})
            return;
        }
        yield adminService.updateUser({userId,username,email,roleIds})
        res.json({})
    }).catch(function(e){
        next(e)
    });
}
exports.userDelGet = function (req, res, next) {
    co(function* (){
        let userId = req.query['userId']
        yield adminModel.destroy({where:{id:userId}})
        res.json({})
    }).catch(function(e){
        next(e)
    });
}
exports.userDetailGet = function (req, res, next) {
    co(function* (){
        let userId = req.query['userId']
        let user = yield adminModel.findOne({
            where:{id:userId},
            include: [{
                model: roleModel,
                attributes:['id','rolename']
            }],
            attributes:['id','username','email']
        });
        if(!user){
            res.json({error:'该用户已经不存在'})
            return;
        }
        res.json(user)
    }).catch(function(e){
        next(e)
    });
}
exports.userCheckSameNameGet = function (req, res, next) {
    let self = this;
    co(function* (){
        let username = req.query['user_name']
        let email = req.query['user_email']
        let userId = req.query['userId']
        let b = yield self.checkUserIsSame({userId,username,email})
        res.json(b)
    }).catch(function(e){
        res.json(false)
        logger.error(e)
    });
}
exports.checkUserIsSame=function({userId,username,email}){
    return co(function* (){
        let count = null;
        if(isNaN(userId)){//创建新用户时的校验
            if(username.length>0){
                count = yield adminModel.count({where:{username}})
            }else if(email){
                count = yield adminModel.count({where:{email}})
            }
        }else{//编辑已有用户时的校验
            if(username){
                count = yield adminModel.count({where:{username,id:{$ne:userId}}})
            }else if(email){
                count = yield adminModel.count({where:{email,id:{$ne:userId}}})
            }
        }
        if(count > 0){
            return false;
        }
        return true;
    })
}
exports.refreshPasswordGet = function (req, res, next) {
    let self = this;
    co(function* (){
        let userId = req.query['userId']
        let userObj = yield adminModel.findOne({where:{id:userId}})
        //重置密码
        let initPassword = utils.generateRandomPassword(8);
        let md5pw = utils.encryptPassword(initPassword,userObj.username)
        yield adminModel.update({password:md5pw},{where:{id:userId}})
        //发邮件告知
        mailer.sendMail4ResetPassword(userObj.email,initPassword);
        res.json({})
    }).catch(function(e){
        res.json(false)
        logger.error(e)
    });
}
