/**
 * Created by licheng on 16/8/25.
 */
var http = require('http')
var querystring = require('querystring')
var mixin = require('merge-descriptors');
var util = require('util');
var Promise = require('promise');

var extend = require('extend')

exports = module.exports = function({hostname,port,path,contentType}){
    //var opts = options || {};
    function handler(){
        handler.options={
            hostname : hostname ||'192.168.100.250',
            //hostname : hostname ||'192.168.50.210',
            port : port || 8080,
            path : path || '/SuperMario/PickUp',
            headers:{
                'Content-Type':contentType || 'application/json; charset=utf-8'
            }
        }
    }
    handler.__proto__ = exports;
    handler();
    return handler;
};

exports.post = function({headers={},body}){
    var postData = JSON.stringify(body);

    var options = {
        method: 'POST',
        headers: {
            'Content-Length': Buffer.byteLength(postData,'utf8')
        }
    };
    options = extend(true,{},this.options,options,{headers:headers})

    var promise = new Promise(function(resolve, reject){
        var req = http.request(options, (res) => {
            var buffers = [];
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                buffers.push(chunk);
            });
            res.on('end', function(){
                if(buffers.length  == 0) {
                    reject(Error(util.format('数据接口异常!STATUS:%s',res.statusCode)));
                    return;
                }
                try{
                    var dataStr = buffers.toString('utf8');
                    //console.log(dataStr)
                    /************以下代码,不应该作为通用模块部分************/
                    let resObj = JSON.parse(dataStr);
                    if(resObj.result && resObj.result == 1){
                       resObj.isOk = false;
                    }
                    resObj.isOk = true;
                    // resObj.dataJsonArray = JSON.parse(resObj.data);
                    resObj.dataJsonArray = resObj.data;
                    /************以上代码,不应该作为通用模块部分************/
                    resolve(resObj);
                }catch (e){
                    reject(Error(util.format('数据接口响应异常!STATUS:%s',res.statusCode)));
                }
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        req.write(postData,'utf8');
        req.end();
    })
    return promise;
}