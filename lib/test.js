/**
 * Created by Administrator on 2015/4/30.
 */
var fs = require('fs'),
    path = require('path');
var promise = require('promise')
var utils = require('./utils')

var exports = module.exports;



promise.resolve()
    .then(function () {
        return promise.resolve()
            .then(function () {
                return  new promise(function (resolve, reject) {
                    reject(new Error('dddddddddddd'))
                })
                    .catch(function(err){
                        throw err;
                    })
            })
    })
.catch(function(err){
        console.log(err.message)
    })