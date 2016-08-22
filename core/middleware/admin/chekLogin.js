
var AdminModel = require('../../models/admin/Admin_M')
var RoleModel = require('../../models/admin/Role_M')
var co = require('co');
var utilsController = require('../../controller/admin/utils_C')
exports = module.exports = {}
exports.checkLogin = (req,res,next) => {
    var path = req._parsedUrl.pathname;
    path = path[path.length - 1] == '/' ? path.slice(0, path.length - 1) : path;
    
    if(utilsController.isLogin4Admin(req)){
        if(path == '/admin/login'){
            res.redirect('/')
            return;
        }
        req.isNeedAccessControl = true;
        next();
    }else{
        if(path == '/admin/login' ||
            path == '/admin/refreshVerifyCode' ||
            path == '/admin/forget'){

            //这些URL资源不是登录后访问的,同时也不需要权限控制器处理
            req.isNeedAccessControl = false;
            next();
            return;
        }
        res.redirect('/admin/login')
    }
}