var express = require('express');

var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var adminService = require('../../service/admin/admin')
var adminModel = require('../../models/admin/Admin')
var roleModel = require('../../models/admin/Role')
var menuModel = require('../../models/admin/Menu')


exports.isLogin4Admin = (req) =>{
    return req.session.adminUser != null;
}
exports.saveAdminLoginSession = (req,{id,username,rolename})=>{
    req.session.adminUser = {
        u_id:id,
        u_name:username
    }
}
exports.clearAdminLoginSession = (req)=>{
    req.session.adminUser = null;
}
exports.getAdminSession =(req)=> {
    if(req.session.adminUser == null){
        throw Error('未登录');
    }
    return {
        id:req.session.adminUser.u_id,
        username:req.session.adminUser.u_name
    }
}

exports.getCommonData =function*(req) {
    let currRole = yield this.getCurrRole(req)
    
    let menus = yield menuModel.findAllMenus({roleids:currRole.roleids,restype:[1,2]})
    return{
        username:currRole.username,
        rolenames:currRole.rolenames.join(','),
        menus:menus
    }

}
exports.getCurrRole =function*(req) {
    let adminObj = yield adminModel.findOne({
        where:{id:this.getAdminSession(req).id},
        include: [{
            model: roleModel
        }]
    })
    let username = adminObj.username
    let rolenames = [],
        roleids = [];
    adminObj.Roles.forEach((role)=>{
        rolenames.push(role.rolename)
        roleids.push(role.id)
    })
    return{
        username:username,
        rolenames:rolenames,
        roleids:roleids
    }
}