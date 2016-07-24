/**
 * Created by Administrator on 2015/4/22.
 */
var grantConfig = require('../core/config/grantConfig');
exports = module.exports = function grantedAuthority(options){
    function handler(req, res, next){
        if(hasGranted(req, options.acl)){
            next();
        }else{
            if(options.refuseView){
                res.render(options.refusedView);
            }else{
                res.sendStatus(403);
            }
        }
    }
    return handler;
};

/**
 *
 * @param req
 * @param acl
 * @returns {boolean}
 */
hasGranted = function(req, acl){
    if(!req.session || !req.session.user || !req.session.user.rolename) return true;

    var path = req.path;
    path = path[path.length - 1] == '/' ? path.slice(0, path.length - 1) : path;

    for(var i = 0; i < acl.length; i ++){
        var authority = acl[i];
        if(path === authority.url){
            var accessArray = [];
            authority.access instanceof Array ? accessArray = authority.access : accessArray.push(authority.access)

            for(var j = 0; j < accessArray.length; j ++){
                var access = accessArray[j];
                if(access === req.session.user.rolename || access === grantConfig.roles.all) return true;
            }
            return false;
        }

    }
    return true;
};
