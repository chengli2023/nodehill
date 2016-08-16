var fs = require('fs');
var path = require('path');
var co = require('co');
var util = require('util')
var utils = require('../../lib/utils')
var db = require('../config/db/db')
var logger = require('log4js').getLogger('CONFIG:ORM');

var Role = require('../models/admin/Role')
var Admin = require('../models/admin/Admin')
var Menu = require('../models/admin/Menu')


Admin.belongsToMany(Role,{through: {model:'Admin_Role',unique: false}, foreignKey: 'adminid_fk'})
Role.belongsToMany(Admin,{through: {model:'Admin_Role',unique: false}, foreignKey: 'roleid_fk'})

Menu.belongsToMany(Role,{through: {model:'Role_Menu',unique: false}, foreignKey: 'menuid_fk'})
Role.belongsToMany(Menu,{through: {model:'Role_Menu',unique: false}, foreignKey: 'roleid_fk'})

//persistent
// co(function* (){
//     yield db.sync({force: true})
//     let adminObj = yield Admin.create({username: 'admin', email: 'chengli2023@foxmail.com', password: '123456'})
//     let adminObj2 = yield Admin.create({username: 'demo', email: 'xxxxx@foxmail.com', password: '123456'})
//     let roleObje = yield Role.create({rolename: '超级管理员', roledesc: '超级管理员描述'})
//     let roleObje2 = yield Role.create({rolename: '普通管理员', roledesc: '普通管理员'})
//     yield adminObj.addRole([roleObje])
//     yield adminObj2.addRole([roleObje2])
//
//     let menu_search =   yield Menu.create({name: '搜索', pid: 0, url: '/admin/search',restype:3,desc:'搜索页面',order:1,icon:100})
//     let menu_sys =      yield Menu.create({name: '系统设置', pid: 0, url: '/admin/sys',restype:1,desc:'系统设置',order:3,icon:100})
//     let menu_user =     yield Menu.create({name: '用户管理', pid: menu_sys.id, url: '/admin/sys/user',restype:2,desc:'用户管理',order:1,icon:100})
//     let menu_res =      yield Menu.create({name: '资源管理', pid: menu_sys.id, url: '/admin/sys/res',restype:2,desc:'资源管理',order:2,icon:100})
//     let menu_alert =    yield Menu.create({name: '告警设置', pid: 0, url: '/admin/alert',restype:1,desc:'告警设置',order:2,icon:100})
//     let menu_areaAlert = yield Menu.create({name: '区域告警', pid: menu_alert.id, url: '/admin/alert/area',restype:2,desc:'区域告警',order:1,icon:100})
//     let menu_role =     yield Menu.create({name: '角色管理', pid: menu_sys.id, url: '/admin/sys/role',restype:2,desc:'角色管理',order:3,icon:100})
//     let menu_addRes =     yield Menu.create({name: '添加资源', pid: menu_res.id, url: '/admin/sys/res/add',restype:3,desc:'添加资源',order:1,icon:100})
//     let menu_delRes =     yield Menu.create({name: '删除资源', pid: menu_res.id, url: '/admin/sys/res/del',restype:3,desc:'删除资源',order:2,icon:'trash'})
//     let menu_editRes =     yield Menu.create({name: '修改资源', pid: menu_res.id, url: '/admin/sys/res/edit',restype:3,desc:'修改资源',order:3,icon:'trash'})
//     let menu_addRole =     yield Menu.create({name: '添加角色', pid: menu_role.id, url: '/admin/sys/role/add',restype:3,desc:'添加角色',order:1,icon:'trash'})
//     let menu_delRole =     yield Menu.create({name: '删除角色', pid: menu_role.id, url: '/admin/sys/role/del',restype:3,desc:'删除角色',order:2,icon:'trash'})
//     let menu_editRole =     yield Menu.create({name: '修改角色', pid: menu_role.id, url: '/admin/sys/role/edit',restype:3,desc:'修改角色',order:3,icon:'trash'})
//     let menu_aclRole =     yield Menu.create({name: '权限配置', pid: menu_role.id, url: '/admin/sys/role/acl',restype:3,desc:'权限配置',order:3,icon:'trash'})
//
//     //给超级管理员预制权限
//     yield roleObje.addMenu([
//         menu_search,
//         menu_sys,
//         menu_user,
//         menu_res,
//         menu_alert,
//         menu_areaAlert,
//         menu_role,
//         menu_addRes,
//         menu_delRes,
//         menu_editRes,
//         menu_addRole,
//         menu_delRole,
//         menu_editRole,
//         menu_aclRole])
//
//     yield roleObje2.addMenu([menu_alert,menu_search,menu_areaAlert])
//
//     //yield  db.query("CALL menu_templst(0);")
//
//
//     console.log('ok ... everything is nice for DB!')
// }).catch(function(e){
//     console.error('oooh, did you enter wrong database credentials?')
//     console.log(e)
// });

