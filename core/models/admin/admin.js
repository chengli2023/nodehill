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
exports.findAllMenus = function* ({rootid=0,roleids = []}) {
    let pidwhere = '';
    roleids = roleids.join(',')
    if(rootid != -1){
        pidwhere = 'and m.pid=' + rootid;
    }else{
        pidwhere = '';
    }

    var sql = 'select distinct m.name, m.* from (select menu.*,menu_templst.nlevel,menu_templst.scort from menu_templst,menu where menu_templst.id = menu.id ) as m,Role_Menu as r where m.id = r.menuid_fk '+pidwhere+ 'and m.restype != ? and FIND_IN_SET(r.roleid_fk,?) order by m.scort';
    let results = yield db.query(sql,{replacements: [3,roleids],model:exports,type: Sequelize.QueryTypes.SELECT});
    return results
};


