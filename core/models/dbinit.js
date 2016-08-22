var fs = require('fs');
var path = require('path');
var co = require('co');
var util = require('util')
var utils = require('../../lib/utils')
var db = require('../config/db/db')
var logger = require('log4js').getLogger('CONFIG:ORM');

var Role = require('../models/admin/Role_M')
var Admin = require('../models/admin/Admin_M')
var Menu = require('../models/admin/Menu_M')


Admin.belongsToMany(Role,{through: {model:'Admin_Role',unique: false}, foreignKey: 'adminid_fk'})
Role.belongsToMany(Admin,{through: {model:'Admin_Role',unique: false}, foreignKey: 'roleid_fk'})

Menu.belongsToMany(Role,{through: {model:'Role_Menu',unique: false}, foreignKey: 'menuid_fk'})
Role.belongsToMany(Menu,{through: {model:'Role_Menu',unique: false}, foreignKey: 'roleid_fk'})

//persistent
// co(function* (){
//     yield db.sync({force: true})
//     let adminObj = yield Admin.create({username: 'admin', email: 'chengli2023@foxmail.com', password: utils.encryptPassword('123456','admin')})
//     let adminObj2 = yield Admin.create({username: 'demo', email: '316094847@qq.com', password: utils.encryptPassword('123456','demo')})
//     let roleObje = yield Role.create({rolename: '超级管理员', roledesc: '超级管理员描述',type:0})
//     let roleObje2 = yield Role.create({rolename: '普通管理员', roledesc: '普通管理员'})
//     yield adminObj.addRole([roleObje])
//     yield adminObj2.addRole([roleObje2])
//
//     let menu_search =   yield Menu.create({name: '搜索', pid: 0, url: '/admin/search',restype:3,reskey:'search',desc:'搜索页面',order:1,icon:''})
//     let menu_sys =      yield Menu.create({name: '系统设置', pid: 0, url: '/admin/sys',restype:1,reskey:'sysSet',desc:'系统设置',order:3,icon:'cog'})
//     let menu_user =     yield Menu.create({name: '用户管理', pid: menu_sys.id, url: '/admin/sys/user',restype:2,reskey:'sysUserSet',desc:'用户管理',order:1,icon:'users'})
//     let menu_res =      yield Menu.create({name: '资源管理', pid: menu_sys.id, url: '/admin/sys/res',restype:2,reskey:'resManage',desc:'资源管理',order:2,icon:'file'})
//     let menu_alert =    yield Menu.create({name: '告警设置', pid: 0, url: '/admin/alert',restype:1,reskey:'alertSet',desc:'告警设置',order:2,icon:'warning'})
//     let menu_areaAlert =  yield Menu.create({name: '区域告警', pid: menu_alert.id, url: '/admin/alert/area',restype:2,reskey:'alertArea',desc:'区域告警',order:1,icon:'bell'})
//     let menu_role =       yield Menu.create({name: '角色管理', pid: menu_sys.id, url: '/admin/sys/role',restype:2,reskey:'roleSet',desc:'角色管理',order:3,icon:'envira'})
//     let menu_addRes =     yield Menu.create({name: '添加资源', pid: menu_res.id, url: '/admin/sys/res/add',restype:3,reskey:'resAdd',desc:'添加资源',order:1,icon:''})
//     let menu_delRes =     yield Menu.create({name: '删除资源', pid: menu_res.id, url: '/admin/sys/res/del',restype:3,reskey:'resDel',desc:'删除资源',order:2,icon:''})
//     let menu_editRes =    yield Menu.create({name: '修改资源', pid: menu_res.id, url: '/admin/sys/res/edit',restype:3,reskey:'editRes',desc:'修改资源',order:3,icon:''})
//     let menu_addRole =    yield Menu.create({name: '添加角色', pid: menu_role.id, url: '/admin/sys/role/add',restype:3,reskey:'roleAdd',desc:'添加角色',order:1,icon:''})
//     let menu_delRole =    yield Menu.create({name: '删除角色', pid: menu_role.id, url: '/admin/sys/role/del',restype:3,reskey:'roleDel',desc:'删除角色',order:2,icon:''})
//     let menu_editRole =   yield Menu.create({name: '修改角色', pid: menu_role.id, url: '/admin/sys/role/edit',restype:3,reskey:'roleEdit',desc:'修改角色',order:3,icon:''})
//     let menu_aclRole =    yield Menu.create({name: '查看权限列表', pid: menu_role.id, url: '/admin/sys/role/acl',restype:3,reskey:'roleList',desc:'查看权限列表',order:3,icon:''})
//     let menu_aclSetRole = yield Menu.create({name: '权限配置', pid: menu_role.id, url: '/admin/sys/role/aclSet',restype:3,reskey:'roleSet',desc:'权限配置',order:3,icon:''})
//     let menu_detailRole = yield Menu.create({name: '查看角色详细', pid: menu_role.id, url: '/admin/sys/role/roleDetail',restype:3,reskey:'roleDetail',desc:'查看角色详细',order:3,icon:''})
//     let menu_detailRes = yield Menu.create({name: '查看资源详细', pid: menu_res.id, url: '/admin/sys/res/resDetail',restype:3,reskey:'resDetail',desc:'查看资源详细',order:3,icon:''})
//     let menu_delUser = yield Menu.create({name: '删除用户', pid: menu_user.id, url: '/admin/sys/user/del',restype:3,reskey:'userDel',desc:'删除用户',order:3,icon:''})
//     let menu_editUser = yield Menu.create({name: '修改用户信息', pid: menu_user.id, url: '/admin/sys/user/edit',restype:3,reskey:'userEdit',desc:'修改用户信息,角色',order:3,icon:''})
//     let menu_createUser = yield Menu.create({name: '创建用户', pid: menu_user.id, url: '/admin/sys/user/create',restype:3,reskey:'userCreate',desc:'创建用户',order:3,icon:''})
//     let menu_detailUser = yield Menu.create({name: '获取用户详细信息', pid: menu_user.id, url: '/admin/sys/user/detail',restype:3,reskey:'userDetail',desc:'获取用户详细信息',order:3,icon:''})
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
//         menu_aclRole,
//         menu_aclSetRole,
//         menu_detailRole,
//         menu_detailRes,
//         menu_delUser,
//         menu_editUser,
//         menu_createUser,
//         menu_detailUser])
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

