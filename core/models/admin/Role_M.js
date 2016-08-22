var Sequelize = require('sequelize')
var db = require('../../config/db/db')
var Admin = require('./Admin_M')
var Menu = require('./Menu_M')
var co = require('co');
var moment = require('moment')
exports = module.exports = db.define('Role', {
        rolename: {
            type: Sequelize.STRING(25)
        },
        roledesc: {
            type: Sequelize.STRING(255)
        },
        type:{
            type: Sequelize.INTEGER
        }
    },{
        freezeTableName: true,//禁用sequelize的表面自动转换功能
        timestamps: true,//增加createAt和updateAt两个字段
        paranoid: false,//禁用deleteAt
        underscored: true//列名用下划线形式
    });
exports.deleteCurrRoleAllRes = function* ({resids,roleIdWillSet}) {
    let transaction = null;
    return co(function*(){
            transaction = yield db.transaction({
                isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
            })

            var sql = 'delete from Role_Menu where roleid_fk = ?';
            yield db.query(sql,{replacements: [roleIdWillSet],type:Sequelize.QueryTypes.DELETE,transaction:transaction});

            if(resids.length == 0){
                yield transaction.commit();
                return;
            }

            let created_at=moment().format('YYYY-MM-DD HH:mm:ss'),updated_at = moment().format('YYYY-MM-DD HH:mm:ss')

            sql = '';
            for(let i = 0;i < resids.length; i ++){
                sql += " select '"+created_at+"','"+updated_at+"', "+resids[i]+","+roleIdWillSet + " "
                if(resids.length != i+1){
                    sql += "  UNION ALL "
                }
            }
            sql = 'INSERT INTO Role_Menu ' + sql;

            yield db.query(sql,{replacements: [],type:Sequelize.QueryTypes.INSERT,transaction:transaction});

            yield transaction.commit();
            return true;
    }).catch(function(e){
        if(transaction){
            transaction.rollback()
        }
        throw e
    })


};
