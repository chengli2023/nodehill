var express = require('express');

var router = express.Router();
var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var db = require('../../config/db/db')
var utilsController = require('./utils')
var adminService = require('../../service/admin/admin')

router.$requestMapping = '/admin';
router.get('/login', function (req, res, next) {
    res.render('admin/login', {});
});
router.post('/login', function (req, res, next) {
    let username = req.body['username']
    let password = req.body['password']

    co(function* (){
        let adminObj = yield adminService.findOne({username,password})
        if(adminObj){
            utilsController.saveAdminLoginSession(req,{
                id:adminObj.id,
                username:adminObj.username
            })
            res.json({});
        }else{
            res.json({error: '用户名或密码不正确'});
        }
    }).catch(function(e){
        next(e)
    });
});
router.get('/logout', function (req, res, next) {
    utilsController.clearAdminLoginSession(req)
});
router.get('/search', function (req, res, next) {
    res.render4admin('admin/search', {req});
});
module.exports = router;