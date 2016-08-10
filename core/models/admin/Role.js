var Sequelize = require('sequelize')
var db = require('../../config/db/db')
var Admin = require('./Admin')
var Menu = require('./Menu')
exports = module.exports = db.define('Role', {
        rolename: {
            type: Sequelize.STRING(25)
        },
        roledesc: {
            type: Sequelize.STRING(255)
        }
    },{
        freezeTableName: true,//禁用sequelize的表面自动转换功能
        timestamps: true,//增加createAt和updateAt两个字段
        paranoid: false,//禁用deleteAt
        underscored: true//列名用下划线形式
    });
