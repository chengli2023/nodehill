
var Sequelize = require('sequelize')
var co = require('co');
var menuModel = require('../../models/admin/Menu_M')
var roleModel = require('../../models/admin/Role_M')
var db = require('../../config/db/db')


exports = module.exports = {}


exports.createRes = function({name,pid,url,restype,reskey,desc,order,icon}){
    let transaction = null;
    return co(function* (){
        transaction = yield db.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        let resObj = yield menuModel.create({name,pid,url,restype,reskey,desc,order,icon},{transaction})

        let superRole = yield roleModel.findOne({where:{type:0}})
        //给超级管理员增加权限
        yield resObj.addRole(superRole,{transaction:transaction})
        yield transaction.commit();
    }).catch(function(e){
        transaction.rollback()
        throw e
    })
};
