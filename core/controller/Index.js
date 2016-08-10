var express = require('express');

var router = express.Router();
var path = require('path');
var utils = require('../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');

var AllModel = require('../models/AllModel')
var ProfileModel = require('../models/ProfileModel')
var db = require('../config/db/db')

router.$requestMapping = '/';
router.get('/', function (req, res, next) {
    res.redirect('/admin/search')
});
/*
router.get('/', function (req, res, next) {
    res.redirect('/login')
});
router.get('/login', function (req, res, next) {
    res.render('login', {req});
});

router.get('/search', function (req, res, next) {
    res.render('search', {req});
});
router.get('/searchResult', function (req, res, next) {
    res.render('searchResult', {req});
});
router.get('/profile', function (req, res, next) {
    co(function* (){
        var peopleId = req.query['peopleId']
        let peopleData = yield ProfileModel.obtainProfileById({peopleId});
        if(peopleData == null){
            res.redirect('/search')
            return;
        }
        res.render('profile', {req,peopleData});
    }).catch(function(e){
        res.json(500,{error: e.message});
    });
});
router.get('/zichanAnalyze', function (req, res, next) {
    var peopleId = req.query['peopleId']
    res.render('zichanAnalyze', {req});
});
router.get('/guijiAnalyze', function (req, res, next) {
    var peopleId = req.query['peopleId']
    res.render('guijiAnalyze', {req});
});
router.get('/xiaofeiAnalyze', function (req, res, next) {
    var peopleId = req.query['peopleId']
    res.render('xiaofeiAnalyze', {req});
});
router.get('/renmaiAnalyze', function (req, res, next) {
    var peopleId = req.query['peopleId']
    res.render('renmaiAnalyze', {req});
});

router.get('/sheaninfo', function (req, res, next) {
    co(function* (){
        var peopleId = req.query['peopleId']
        let peopleData = yield ProfileModel.obtainProfileById({peopleId});

        let peopleData2 = null;
        if(peopleId == 1) {
            peopleData2 = yield ProfileModel.obtainProfileById({peopleId:2});
        }
        if(peopleId == 2) {
            peopleData2 = yield ProfileModel.obtainProfileById({peopleId:1});
        }
        if(peopleId == 3) {
            peopleData2 = yield ProfileModel.obtainProfileById({peopleId:1});
        }
        if(peopleData == null){
            res.redirect('/search')
            return;
        }
        res.render('sheaninfo', {req,peopleData,peopleData2});
    }).catch(function(e){
        res.json(500,{error: e.message});
    });
});
*/

module.exports = router;
