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
//     let roleObje = yield Role.create({rolename: '超级管理员', roledesc: '超级管理员描述'})
//     yield adminObj.addRole(roleObje)
//
//     let menuObj = yield Menu.create({name: '搜索', parent: '0', url: '/search',type:'3',desc:'搜索页面',order:1,icon:100})
//     yield roleObje.addMenu(menuObj)
//     console.log('ok ... everything is nice for DB!')
// }).catch(function(e){
//     console.error('oooh, did you enter wrong database credentials?')
//     console.log(e)
// });

