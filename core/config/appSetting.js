/**
 * Created by Administrator on 2015/4/22.
 */
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var ejs = require('ejs');
var log4js = require('log4js');
log4js.configure('core/config/log4jsConfig.json',{ reloadSecs: 5 });

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
        saveUninitialized: false,
        resave: true
        /*store: new mongoStore({
         url: dbConfig.db,
         collection: 'sessions'
         })*/
    }));
    app.use('/public', express.static(path.resolve('public')));

    //app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));
};
