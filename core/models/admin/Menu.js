var Sequelize = require('sequelize')
var db = require('../../config/db/db')
var roleModel = require('./Role')
var menuService = require('../../service/admin/menu')
exports = module.exports = db.define('Menu', {
        name: {
            type: Sequelize.STRING(25)
        },
        pid:{
            type: Sequelize.INTEGER
        },
        url: {
            type: Sequelize.STRING(255)
        },
        restype:{
            type: Sequelize.INTEGER
        },
        desc:{
            type: Sequelize.STRING(255),
            allowNull: true
        },
        order:{
            type: Sequelize.INTEGER
        },
        icon:{
            type: Sequelize.STRING(100),
            allowNull: true
        },
        nlevel:{
            type: Sequelize.VIRTUAL
        }
    },{
        freezeTableName: true,//禁用sequelize的表面自动转换功能
        timestamps: true,//增加createAt和updateAt两个字段
        paranoid: false,//禁用deleteAt
        underscored: true//列名用下划线形式
    });
exports.createRes = function* ({name,pid,url,restype,desc,order,icon}) {
    let menuObj = yield exports.create({name,pid,url,restype,desc,order,icon})
    return menuObj;
};

exports.findAllMenus = function* ({pid=null, roleids = null,restype=null}) {
    let pidwhere = '';
    let roleidswhere = '';
    let restypewhere = '';

    if(pid){
        pidwhere = ' and m.pid=' + pid + ' ';
    }
    if(roleids){
        roleids = roleids.join(',')
        roleidswhere = ' and FIND_IN_SET(r.roleid_fk,\''+roleids+'\') ';
    }
    if(restype){
        restype = restype.join(',')
        restypewhere = ' and FIND_IN_SET(m.restype, \''+restype+'\') '
    }

    var sql = 'SELECT distinct m.name,m.* FROM nodehill.Menu as m,Role_Menu as r where m.id = r.menuid_fk '+ pidwhere + restypewhere + roleidswhere;
    let menuObjs = yield db.query(sql,{replacements: [],model:exports});


    /**** 资源层级排序****/
    return menuService.resSorter(menuObjs,0,0)
};
