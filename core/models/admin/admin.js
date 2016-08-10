var Sequelize = require('sequelize')
var db = require('../../config/db/db')

var Role = require('./Role')
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

//Example
exports.findAllBuyList = function* ({limit=300,offset=0}) {
    var sql = 'select dd.*,goodid2name.goodname goodname,useridname.username from (select usergood.user userid, usergood.good goodid from usergood group by userid limit 300 offset 0 ) as dd,goodid2name,useridname where goodid2name.goodid=dd.goodid and useridname.userid =dd.userid';
    let result = yield db.query(sql,{replacements: [limit,offset],type: sequelize.QueryTypes.SELECT});
    return result
};

