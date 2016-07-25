var express = require('express');

var router = express.Router();
var path = require('path');
var utils = require('../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var AllModel = require('../models/AllModel')
var db = require('../config/db/db')

router.$requestMapping = '/';
router.get('/', function (req, res, next) {
    co(function* (){
        var buyList = yield AllModel.findAllBuyList({});
        res.render('index', {

            req: req,
            buyList:buyList
        });
    }).catch(function(e){
        next(e)
    });
});

router.post('/save', function (req, res, next) {

    var username = req.body['saveUsername'];
    var goodname = req.body['saveGoodName'];
    db.transaction(function (transaction) {
        return co(function* (){
            //校验用户名是否存在

            let checkResult = true;
            let checkMsg = [];
            let currMaxUserid = 0;

            //校验商品名称是否存在
            var goodObj = yield AllModel.getGood({goodname});
            if(!goodObj || !goodObj.goodid) {
                checkResult = false;
                checkMsg.push('音乐名称不存在');
            }

            if(!checkResult){
                res.json(utils.genJsonRes.genErrorRes({msg:checkMsg.join(', ')}));
                return;
            }
            var userObj = yield AllModel.getUser({username});
            if(!userObj || !userObj.userid) {
                let getMaxUserIdResult = yield AllModel.genUserId();
                currMaxUserid = getMaxUserIdResult.maxUserId + 1;
                yield AllModel.saveUserInfo({'userid':currMaxUserid,username},transaction);
                userObj = {userid:currMaxUserid,username:username}
            }

            var saveResult = yield AllModel.saveBuyInfo({'userid':userObj.userid,'goodid':goodObj.goodid},transaction);
            yield AllModel.saveBuyInfo2({'userid':userObj.userid,'goodid':goodObj.goodid},transaction);

            res.json(utils.genJsonRes.genSuccessRes({result:{username:userObj.username,goodname:goodObj.goodname}}));


        }).catch(function(e){
            next(e)
        });
    })

});

router.get('/queryBuyList', function (req, res, next) {
    co(function* (){
        var username = req.query['username'];
        //校验用户名是否存在
        var userObj = yield AllModel.getUser({username});
        if(!userObj || !userObj.userid) res.json(utils.genJsonRes.genErrorRes({msg:'用户不存在'}));

        var buyList = yield AllModel.findBuyListByUser({userid:userObj.userid})
        var recList = yield AllModel.findRecListByUser({userid:userObj.userid})

        for(let i = 0;i < buyList.length;i ++){
            let item = buyList[i];
            let userListStr = [];
            let userList = yield AllModel.findUserListByGoodId({'goodid':item.goodid})
            for(let i = 0; i < userList.length; i ++){
                userListStr.push(userList[i].username)
            }
            item.userList = userListStr;
        }

        /*for(let i = 0;i < recList.length;i ++){
            let item = recList[i];
            let userListStr = [];
            let userList = yield AllModel.findUserListByGoodId({'goodid':item.goodid})
            for(let i = 0; i < userList.length; i ++){
                userListStr.push(userList[i].username)
            }
            item.userList = userListStr;
        }*/

        res.json({
            buyList,
            recList
        })
    }).catch(function(e){
        next(e)
    });
});
module.exports = router;
