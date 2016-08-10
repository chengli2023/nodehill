
var AdminModel = require('../../models/admin/Admin')
var RoleModel = require('../../models/admin/Role')
var co = require('co');
var utilsController = require('../../controller/admin/utils')
exports = module.exports = {}
exports.checkLogin = (req,res,next) => {
    var path = req.path;
    path = path[path.length - 1] == '/' ? path.slice(0, path.length - 1) : path;
    
    if(utilsController.isLogin4Admin(req)){
        if(path == '/login'){
            res.redirect('/')
            return;
        }
        next();
    }else{
        if(path == '/login'){
            next();
            return;
        }
        res.redirect('/admin/login')
    }
}