/**
 * Created by licheng on 16/8/5.
 */
var co = require('co');
var AdminModel = require('../../models/admin/Admin')
var RoleModel = require('../../models/admin/Role')
exports = module.exports = {};

exports.findOne= ({username,password}) => {
    return AdminModel.findOne({
        where: {username: username,password:password},
        include: [{model: RoleModel}]
    });
}
