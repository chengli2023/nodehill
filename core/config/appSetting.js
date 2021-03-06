
/**
 * Created by Administrator on 2015/4/22.
 */
var express = require('express');
var path = require('path');
var fs = require('fs');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var RedisStore = require('connect-redis')(session);
var ejs = require('ejs');
var log4js = require('log4js');
log4js.configure('core/config/log4jsConfig.json',{ reloadSecs: 5 });
var co = require('co');
var checkLogin = require('../middleware/admin/chekLogin')
var authorization = require('../middleware/admin/authorization')
var utilsController = require('../controller/admin/utils_C')

const database = require('../config/db/db')


//数据库初始化
require('../models/dbinit')

module.exports = function (app) {
    // view engine setup
    app.set('views', path.resolve('core/views'));
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');
    
    app.use(favicon(path.resolve('public/favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    app.use(session({
        cookie :{maxAge:36000000,path:'/'},
        secret: 'keyboard cat',
        saveUninitialized: true,
        resave: true,
        store: new RedisStore({})
    }));
    app.use('/public', express.static(path.resolve('public')));
    //app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

    /**********  router config  ***********/
    //后台系统-登录校验
    app.use('/admin',checkLogin.checkLogin);
    //后台系统-权限控制
    app.use('/admin',authorization({
        escapeACL:[//不需要权限控制的资源
            '/admin/home',//首页
            '/admin/logout',//退出
            '/admin/profile',//当前登录用户的个人信息
            '/admin/sys/res/checkSameNameInRes',//校验资源名称是否有重复的
            '/admin/sys/role/roleCheckSameName',//校验角色名称是否有重复的
            '/admin/sys/user/userCheckSameName',//校验用户名称是否有重复的
            '/admin/sys/user/refreshPassword',//生成密码

            '/admin/userCheckSameEmail',//校验用户的Email是否重复
            '/admin/checkPassword',//登录密码校验
            '/admin/updateEmail',//用于当前用户修改邮箱
            '/admin/updatePassword'//用于当前用户修改密码

        ]
    }));

    //后台系统-获取角色,menu,等页面框架相关数据,并设置到Req中等待ejs中使用
    app.use('/admin',function(req,res,next){
        res.render4admin = function(name, options, callback){
            co(function*(){
                let commonData= yield utilsController.getCommonData(req)
                options.commonData = commonData;
                res.render(name, options, callback)

            }).catch(function(e){
                next(e)
            });
        }
        next();
    })


    //Application router
    var controllerDir = path.join(__dirname, '../router/');

    loadRouter = (controllerDir) =>{
        fs.readdirSync(controllerDir).forEach(function (file) {
            let filePath = path.resolve(controllerDir, file);
            let stats = fs.lstatSync(filePath)
            if (stats.isDirectory()) loadRouter(filePath)

            if (~file.indexOf('.js')){
                var router = require(filePath);
                if(router.$requestMapping){
                    app.use(router.$requestMapping,router)
                }
            }
        });
    }
    loadRouter(controllerDir);



    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            if(req.xhr){
                res.json(500,{message:err.message});
                return;
            }
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        if(req.xhr){
            res.json(500,{message:err.message});
            return;
        }
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
