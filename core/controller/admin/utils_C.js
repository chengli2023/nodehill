var express = require('express');

var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var adminService = require('../../service/admin/admin_S')
var adminModel = require('../../models/admin/Admin_M')
var roleModel = require('../../models/admin/Role_M')
var menuModel = require('../../models/admin/Menu_M')


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
    let self = this;
    let currRole = yield this.getCurrRole(req)
    
    let menus = yield menuModel.findAllMenus({roleids:currRole.roleids,restype:[1,2]})
    return{
        userId:currRole.userId,//用户ID
        email:currRole.email,//email
        username:currRole.username,//用户名
        rolenames:currRole.rolenames,//数组
        roleids:currRole.roleids,//数组
        menus:menus,//数组
        isSuperAdmin:currRole.isSuperAdmin//boolean
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
    let email = adminObj.email
    let userId = adminObj.id
    let rolenames = [],
        roleids = [];
    let isSuperAdmin = false;
    adminObj.Roles.forEach((role)=>{
        rolenames.push(role.rolename)
        roleids.push(role.id)
        if(role.type == 0){//是超级管理员
            isSuperAdmin = true;
        }
    })
    return{
        userId:userId,
        username:username,
        email:email,
        rolenames:rolenames,
        roleids:roleids,
        isSuperAdmin:isSuperAdmin
    }
}