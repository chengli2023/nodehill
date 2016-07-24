/**
 * Created by Administrator on 2015/4/22.
 */
var exports = module.exports = {};

var roles = exports.roles = {
    masterAdmin: 'masterAdmin',
    admin: 'admin',
    all:'all'
}
//没有配置的url,将对所有角色开放。如果access值为roles.all，同不配置效果一样
exports.acl = [
    //{url: '/login', access: roles.all},
    //{url: '/logout', access: roles.all},
    //{url: '/profile', access: roles.all},

    //{url: '/user/search', access: roles.all},
    //{url: '/user/detail', access: roles.all},
    //{url: '/user/associated_account_list', access: roles.all},

    //{url: '/master_admin/admins', access: [roles.masterAdmin]},
    //{url: '/master_admin/add_admin', access: [roles.masterAdmin]},
    //{url: '/master_admin/edit_admin', access: [roles.masterAdmin]},
    //{url: '/master_admin/delete_admin', access: [roles.masterAdmin]},

    //{url: '/trip/list', access: roles.all},
    //{url: '/trip/detail', access: roles.all}
]


exports.refusedView = '';