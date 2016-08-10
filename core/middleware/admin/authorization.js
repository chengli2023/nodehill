/**
 * Created by Administrator on 2015/4/22.
 */
var co = require('co');
var db = require('../../config/db/db')
var utilsController = require('../../controller/admin/utils')
var adminService = require('../../service/admin/admin')

var AdminModel = require('../../models/admin/Admin')
var RoleModel = require('../../models/admin/Role')
var MenuModel = require('../../models/admin/Menu')

exports = module.exports = function(options){
    var opts = options || {};

    function handler(req,res,next){
        handler._req = req;
        handler.handle(req,res,next)
    }
    handler.__proto__ = exports;

    handler.escapeACL = opts.escapeACL;
    return handler;
}

exports.handle = function(req,res,next){
    let self = this;
    co(function*(){
        //判断请求是否需要权限控制
        let path = self.reqPath();

        if(~self.escapeACL.indexOf(path)){
            next();
            return;
        }

        /******根据当前角色和请求资源判断是否有权限*****/
        let userId = utilsController.getAdminSession(req).id;
        //根据userId获取所有角色
        let adminObj = yield AdminModel.findOne({
            where: {id:userId},
            include: [{model: RoleModel,include:[{model:MenuModel}]}]
        });
        for(let i = 0;i < adminObj.Roles.length;i ++){
            let role =  adminObj.Roles[i];
            for(let i = 0;i < role.Menus.length;i ++){
                let menu = role.Menus[i];
                if(self.moveUrlEndSlash(menu.url) == path){
                    next();
                    return;
                }
            }
        }

        throw Error('没有权限')
    }).catch(function(e){
        next(e)
    })

};
exports.reqPath=function(){
    return this.moveUrlEndSlash(this._req.path)

}
exports.moveUrlEndSlash = (path)=>{
    path = path[path.length - 1] == '/' ? path.slice(0, path.length - 1) : path;
    return path;
}