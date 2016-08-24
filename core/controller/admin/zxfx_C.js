
var path = require('path');
var utils = require('../../../lib/utils');
var crypto = require('crypto');
var util = require('util');
var co = require('co');
var logger = require('log4js').getLogger('CONTROLLER:INDEX');


var utilsController = require('./utils_C')

exports = module.exports = function(handle){
    //var opts = options || {};
    function handler(req,res,next){
        handler._req = req;
        handler._res = res;
        handler._next = next;
        handle.bind(handler)(req,res,next);
    }
    handler.__proto__ = exports;
    return handler;
};

exports.profileGet = function (req, res, next) {
    res.render4admin('admin/zxfx/profile', {
        req
    });
}
exports.sheaninfoGet = function (req, res, next) {
    // let peopleId = req.query['peopleId']
    let peopleId = 1
    var peopleData = null;
    if(peopleId == 1){
        peopleData = {
            name:"李畅畅",
            sex:"男",
            age:"34",
            zhiwuxingxi:"浙江宁波市鄞州金星皮革化工厂 董事长",
            telNumber:"13009091256",
            addr:"浙江省宁波市奉化市桥东岸路金钟小区14幢1-2",
            idNumber:"342422198209082331",
            isMarried:"未婚",

            zhixingfayuan:"奉化市人民法院",
            shengfen:"浙江",
            wenhao:"(2013)甬奉商初字第01018号",
            lianshijian:"2015年06月25日",
            anhao:"(2015)甬奉执民字第01767号",
            yijudanwei:"宁波奉化法院",
            yiwu:"被执行人沈建芬、李畅畅应支付申请执行人浙江安信资产管理集团有限公司案款159292.9元及相应利息，承担案件受理费5551元，公告费500元，执行费3310.73元。",
            lvxinqingkuang:"全部未履行",
            jutiqingkuang:"其他有履行能力而拒不履行生效法律文书确定义务",
            pubTime:"2016年07月26日",
            score:82
        }
    }else if(peopleId == 2){
        peopleData = {
            name:"吴美浓",
            sex:"女",
            age:"57",
            zhiwuxingxi:"浙江宁波市鄞州金星皮革化工厂 董事长",
            telNumber:"13328198728",
            addr:"浙江省宁波市奉化市金钟路东城公寓3号楼2单元405室",
            idNumber:"330224195909086028",
            isMarried:"已婚",

            zhixingfayuan:"奉化市人民法院",
            shengfen:"浙江",
            wenhao:"(2013)甬奉商初字第01018号",
            lianshijian:"2015年06月25日",
            anhao:"(2015)甬奉执民字第01767号",
            yijudanwei:"宁波奉化法院",
            yiwu:"被执行人吴美浓应归还申请执行人邓桂兰案款15000元及相应利息，承担案件受理费88元，执行费126.32元。",
            lvxinqingkuang:"全部未履行",
            jutiqingkuang:"其他有履行能力而拒不履行生效法律文书确定义务",
            pubTime:"2016年07月26日",
            score:60
        }
    }else if(peopleId == 3) {
        peopleData = {
            name: "应玉儿",
            sex: "女",
            age: "46",
            zhiwuxingxi: "浙江宁波市鄞州金星皮革化工厂 董事长",
            telNumber: "13016969816",
            addr: "浙江省宁波市奉化市塔山小区42号",
            idNumber: "330224197001230027",
            isMarried: "未婚",

            zhixingfayuan: "奉化市人民法院",
            shengfen: "浙江",
            wenhao: "(2013)甬奉商初字第01018号",
            lianshijian: "2015年06月25日",
            anhao: "(2015)甬奉执民字第01767号",
            yijudanwei: "宁波奉化法院",
            yiwu: "截止2016年2月29日，被执行人奉化市海贝玩具制造有限公司应归还申请执行人交通银行股份有限公司宁波奉化支行借款本金119万元及相应利息，被执行人宁波海贝玩具制造有限公司应向申请执行人交通银行股份有限公司宁波奉化支行归还承兑汇票垫款3259465.25元及相应利息，并赔偿申请执行人交通银行股份有限公司宁波奉化支行律师费150816.4元。被执行人奉化市多米诺玩具制造有限公司在最高限额人民币1496万元内对被执行人宁波海贝玩具制造有限公司的上述付款义务承担连带保证责任。被执行人宁波市嘉汇休闲用品有限公司在最高限额人民币495万元内对被执行人宁波海贝玩具制造有限公司的上述付款义务承担连带保证责任。被执行人余美利、蔡尚立在最高限额人民币1496万元内对被执行人宁波海贝玩具制造有限公司的上述付款义务承担连带保证责任。被执行人蔡善国、应玉儿在最高限额人民币946万元内对被执行人宁波海贝玩具制造有限公司的上述付款义务承担连带保证责任。被执行人江苏多米诺塑胶制造有限公司在最高限额人民币946万元内对被执行人宁波海贝玩具制造有限公司在上述第一项确定的还款义务及第三项中的律师费76011.47元承担连带保证责任。案件受理费21979元，由被执行人宁波海贝玩具制造有限公司、奉化市多米诺玩具制造有限公司、宁波市嘉汇休闲用品有限公司、余美利、蔡尚立、蔡善国、应玉儿共同负担，被执行人江苏多米诺塑胶制造有限公司对其中的案件受理费6198元应共同负担。被执行人宁波海贝玩具制造有限公司承担执行费49066.75元。",
            lvxinqingkuang: "全部未履行",
            jutiqingkuang: "其他有履行能力而拒不履行生效法律文书确定义务",
            pubTime: "2016年05月17日",
            score: 31
        }
    }

    res.render4admin('admin/zxfx/sheaninfo', {
        peopleData,
        
        req
    });
}
exports.zcfxGet = function (req, res, next) {
    res.render4admin('admin/zxfx/zcfx', {
        req
    });
}
exports.gjfxGet = function (req, res, next) {
    res.render4admin('admin/zxfx/gjfx', {
        req
    });
}
exports.xffxGet = function (req, res, next) {
    res.render4admin('admin/zxfx/xffx', {
        req
    });
}