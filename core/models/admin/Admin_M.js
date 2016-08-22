var Sequelize = require('sequelize')
var db = require('../../config/db/db')

var Role = require('./Role_M')
var moment = require('moment')
exports = module.exports = db.define('Admin', {
        username: {
            type: Sequelize.STRING(25)
        },
        email: {
            type: Sequelize.STRING(50),
            unique:true
        },
        password:{
            type: Sequelize.STRING(64)

        }

    },{
        freezeTableName: true,//禁用sequelize的表面自动转换功能
        timestamps: true,//增加createAt和updateAt两个字段
        paranoid: false,//禁用deleteAt
        underscored: true//列名用下划线形式
    });


exports.updateRole = function* ({userId,roleIds,transaction}) {

    var sql = 'delete from Admin_Role where adminid_fk = ?';
    let deleted = yield db.query(sql,{replacements: [userId],type:Sequelize.QueryTypes.DELETE,transaction});

    let created_at=moment().format('YYYY-MM-DD HH:mm:ss'),updated_at = moment().format('YYYY-MM-DD HH:mm:ss')
    sql = '';
    for(let i = 0;i < roleIds.length; i ++){
        sql += " select '"+created_at+"','"+updated_at+"', "+userId+","+roleIds[i] + " "
        if(roleIds.length != i+1){
            sql += "  UNION ALL "
        }
    }
    sql = 'INSERT INTO Admin_ROle(created_at,updated_at,adminid_fk,roleid_fk) ' + sql;
    let inserted = yield db.query(sql,{replacements: [],type:Sequelize.QueryTypes.INSERT,transaction});

};
