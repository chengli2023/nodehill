var co = require('co');
var Promise = require('promise');
var http = require('http');
module.exports.ss = function *(){
	
	
	var promise = new Promise(function (resolve, reject) {
        http.get('http://www.baidu.com',function(res){
			console.log('STATUS: ' + res.statusCode); 
			if(res.statusCode == 200){
				resolve('1111111111111111');
			}else{
				reject('error--')
			}
		});
    })
	var promise2 = new Promise(function (resolve, reject) {
        http.get('http://www.baidu.com',function(res){
			console.log('STATUS: ' + res.statusCode); 
			if(res.statusCode == 200){
				resolve('22222222222');
			}else{
				reject('error--')
			}
		});
    })
    var y1 = yield promise 
	var y2 = yield promise2
	return y1+' ' + y2
}
