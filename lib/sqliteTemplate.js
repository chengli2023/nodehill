/**
 * Created by Administrator on 2015/5/26.
 */
var Promise = require('promise');
var sqlite3 = require('sqlite3');
var db = null;
var dbTemplate = {};

dbTemplate.connect = function(callback){
    db = new sqlite3.Database("chap06.sqlite3", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
        function(err){
            if (err){
                callback(err);
            } else {
                callback(null);
            }
        });
};

dbTemplate.query = function(sql, values){
    return new Promise(function (resolve, reject) {
        console.log(sql + ' ' + values);
        db.run(sql, values,function(err,result){
                if (err) return reject(err);
                resolve(result);
            }
        );
    })
};

module.exports = dbTemplate;
