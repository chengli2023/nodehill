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
//     let menu_search =   yield Menu.create({name: '搜索', pid: 0, url: '/search',restype:3,desc:'搜索页面',order:1,icon:100})
//     let menu_sys =      yield Menu.create({name: '系统设置', pid: 0, url: '/sys',restype:1,desc:'系统设置',order:1,icon:100})
//     let menu_user =     yield Menu.create({name: '用户管理', pid: menu_sys.id, url: '/sys/user',restype:2,desc:'用户管理',order:1,icon:100})
//     let menu_res =      yield Menu.create({name: '资源管理', pid: menu_sys.id, url: '/sys/res',restype:2,desc:'资源管理',order:1,icon:100})
//     let menu_alert =    yield Menu.create({name: '告警设置', pid: 0, url: '/alert',restype:1,desc:'告警设置',order:1,icon:100})
//     let menu_areaAlert = yield Menu.create({name: '区域告警', pid: menu_alert.id, url: '/alert/area',restype:2,desc:'区域告警',order:1,icon:100})
//     let menu_role =     yield Menu.create({name: '角色管理', pid: menu_sys.id, url: '/sys/role',restype:2,desc:'角色管理',order:1,icon:100})
//
//     yield roleObje.addMenu([menu_search,menu_sys,menu_user,menu_res,menu_alert,menu_areaAlert,menu_role])
//     yield roleObje2.addMenu([menu_alert,menu_search,menu_areaAlert])
//
//     yield  db.query("CALL menu_templst(0);")
//
//
//     console.log('ok ... everything is nice for DB!')
// }).catch(function(e){
//     console.error('oooh, did you enter wrong database credentials?')
//     console.log(e)
// });

