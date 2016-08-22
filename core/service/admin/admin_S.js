/**
 * Created by licheng on 16/8/5.
 */
var Sequelize = require('sequelize')
var co = require('co');
var adminModel = require('../../models/admin/Admin_M')
var RoleModel = require('../../models/admin/Role_M')
var db = require('../../config/db/db')
var utils = require('../../../lib/utils')

exports = module.exports = {};

exports.findOne= ({username,password}) => {
    return adminModel.findOne({
        where: {username: username,password:password},
        include: [{model: RoleModel}]
    });
}
exports.updateUser= ({userId,username,email,roleIds}) => {
    let transaction = null;
    return co(function* () {
        transaction = yield db.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        yield adminModel.update({username,email},{where:{id:userId},transaction})
        yield adminModel.updateRole({userId,roleIds,transaction})
        yield transaction.commit();
    }).catch(function(e){
        transaction.rollback()
        throw e
    })
}
exports.createUser= ({username,email,roleIds}) => {
    let transaction = null;
    return co(function* () {
        transaction = yield db.transaction({
            isolationLevel: Sequelize.Transaction.ISOLATION_LEVELS.READ_COMMITTED
        })
        let randomPassword = utils.encryptPassword(utils.generateRandomPassword(8),username);
        let userObj = yield adminModel.create({username,email,password:randomPassword},{transaction})
        yield adminModel.updateRole({userId:userObj.id,roleIds,transaction})
        //发邮件
        yield transaction.commit();
    }).catch(function(e){
        transaction.rollback()
        throw e
    })
}