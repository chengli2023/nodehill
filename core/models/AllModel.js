
var util = require('util');
var db = require('../config/db/db')
var logger = require('log4js').getLogger('AllModel');


exports = module.exports = {};

/**
 * 查找所有购买记录
 * @param limit
 * @param offset
 * @returns {*}
 */
exports.findAllBuyList = function* ({limit=300,offset=0}) {
    //var sql = 'select usergood.user userid, usergood.good goodid, useridname.username username, goodid2name.goodname goodname, count(distinct goodid) from  usergood inner join goodid2name inner join useridname on goodid2name.goodid=usergood.good and useridname.userid =usergood.user group by goodid,userid limit ? offset ?';
    var sql = 'select dd.*,goodid2name.goodname goodname,useridname.username from (select usergood.user userid, usergood.good goodid from usergood group by userid limit 300 offset 0 ) as dd,goodid2name,useridname where goodid2name.goodid=dd.goodid and useridname.userid =dd.userid';
    let result = yield db.query(sql,{replacements: [limit,offset]});
    return result[0]
};

/**
 * 查询用户下的购买记录
 * @param userid
 * @param limit
 * @param offset
 * @returns {*}
 */
exports.findBuyListByUser = function* ({userid,limit=10,offset=0}) {
    let buyResultSql = 'select usergood.good goodid, goodid2name.goodname goodname, count(distinct goodid) from  usergood inner join goodid2name inner join useridname on goodid2name.goodid=usergood.good and useridname.userid =usergood.user where usergood.user =?  group by goodid limit ? offset ?';
    let buyResult = yield db.query(buyResultSql,{replacements: [userid,limit,offset]});
    return buyResult[0]
};
/**
 * 通过商品查购买过的人
 * @param goodid
 * @param limit
 * @param offset
 * @returns {*}
 */
exports.findUserListByGoodId = function* ({goodid,limit=10,offset=0}) {
    let sql = 'select useridname.username,count(distinct gooduser.good) from gooduser inner join useridname on useridname.userid=gooduser.user where gooduser.good=? group by gooduser.good,gooduser.user limit ? offset ?';
    let result = yield db.query(sql,{replacements: [goodid,limit,offset]});
    return result[0]
};

/**
 * 查找推荐表通过用户
 * @param userid
 * @param limit
 * @param offset
 * @returns {*}
 */
exports.findRecListByUser = function* ({userid,limit=10,offset=0}) {
    let recResultSql = 'select userrec.good goodid, goodid2name.goodname goodname,count(distinct goodid) from  userrec inner join goodid2name inner join useridname on goodid2name.goodid=userrec.good and useridname.userid =userrec.user where userrec.user=? group by userid,goodid limit ? offset ?';
    let recResult = yield db.query(recResultSql,{replacements: [userid,limit,offset]});
    return recResult[0]
};

/**
 * 通过用户名获取用户
 * @param username
 * @returns {*}
 */
exports.getUser = function* ({username}) {
    username = username.toLowerCase();
    let sql = 'select useridname.userid userid,useridname.username username from useridname where LOWER(username)=? limit 1 offset 0';
    let result = yield db.query(sql,{replacements: [username]});
    if(result[0].length != 0) return result[0][0]
    return null
};

exports.genUserId = function* () {
    let sql = 'select max(cast(userid as int)) maxUserId from useridname';
    let result = yield db.query(sql,{replacements: []});
    if(result[0].length != 0) return result[0][0]
    return null
};


exports.getGood = function* ({goodname}) {
    goodname = goodname.toLowerCase();
    let sql = 'select goodid2name.goodid goodid, goodid2name.goodname goodname from goodid2name where LOWER(goodname)=? limit 1 offset 0';
    let result = yield db.query(sql,{replacements: [goodname]});
    if(result[0].length != 0) return result[0][0]
    return null
};

exports.saveBuyInfo = function* ({userid,goodid},transaction) {
    var sql = 'insert into usergood(user,good) values(?,?)';
    let result = yield db.query(sql,{replacements: [userid,goodid],transaction});
    if(result[1].changes > 0) return {rowid:result[1].lastID};
    return null;
};

exports.saveBuyInfo2 = function* ({userid,goodid},transaction) {
    var sql = 'insert into userplay(userid,goodid) values(?,?)';
    let result = yield db.query(sql,{replacements: [userid,goodid],transaction});
    if(result[1].changes > 0) return {rowid:result[1].lastID};
    return null;
};

exports.saveUserInfo = function* ({userid,username},transaction) {
    var sql = 'insert into useridname(userid,username) values(?,?)';
    let result = yield db.query(sql,{replacements: [userid,username],transaction});
    if(result[1].changes > 0) return {rowid:result[1].lastID};
    return null;
};
