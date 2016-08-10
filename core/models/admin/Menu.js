var Sequelize = require('sequelize')
var db = require('../../config/db/db')
var Role = require('./Role')
exports = module.exports = db.define('Menu', {
        name: {
            type: Sequelize.STRING(25)
        },
        parent:{
            type: Sequelize.INTEGER
        },
        url: {
            type: Sequelize.STRING(255)
        },
        type:{
            type: Sequelize.INTEGER
        },
        desc:{
            type: Sequelize.STRING(255)
        },
        order:{
            type: Sequelize.INTEGER
        },
        icon:{
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,//禁用sequelize的表面自动转换功能
        timestamps: true,//增加createAt和updateAt两个字段
        paranoid: false,//禁用deleteAt
        underscored: true//列名用下划线形式
    });
