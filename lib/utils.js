/**
 * Created by Administrator on 2015/4/22.
 */
var promise = require('promise')
var exports = module.exports = {};
var crypto = require('crypto')

exports.errors = function (errors) {
    var keys = Object.keys(errors)
    var errs = []

    // if there is no validation error, just display a generic error
    if (!keys) {
        return ['Oops! There was an error']
    }

    keys.forEach(function (key) {
        if (errors[key]) errs.push(errors[key].message)
    })

    return errs
};

function stringToBytes ( str ) {
    var ch, st, re = [];
    for (var i = 0; i < str.length; i++ ) {
        ch = str.charCodeAt(i);  // get char
        st = [];                 // set up "stack"
        do {
            st.push( ch & 0xFF );  // push byte to stack
            ch = ch >> 8;          // shift value down by 1 byte
        }
        while ( ch );
        // add stack contents to result
        // done because chars have "wrong" endianness
        re = re.concat( st.reverse() );
    }
    // return an array of bytes
    return re;
}
exports.encryptPassword = function (password, salt) {

    if (!password) return '';
    try {
        var b = crypto
            .createHash('md5',salt)
            .update(password)
            .digest('hex');

        return b

    } catch (err) {
        console.log(err)
        return '';
    }
}
//console.log(exports.encryptPassword('yxu@stationdm.com','yxu@stationdm.com'))

exports.generateRandomPassword = function (length) {
    var chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','a','b','c','d','e','f','g','h','i','j','k','l','+','.','!'];
    var res = "";
    for (var i = 0; i < length; i++) {
        var id = Math.ceil(Math.random() * chars.length);
        res += chars[id];
    }
    return res;
}

exports.checkLogin = function (req) {
    if(req.session.username && req.session.username.length > 0){
        return true;
    }
    return false;
}

exports.checkInput4Paging = function (flag,v) {
    var _v = null;
    if(flag == 'page'){
        try{
            _v =  parseInt(v);
            if(isNaN(_v)){
                _v = 1
            }
            if(_v < 1)  _v = 1;
        }catch (e){
            _v= 1;
        }

    }
    if(flag == 'perPageSize'){
        try{
            _v =  parseInt(v);
            if(isNaN(_v)){
                _v = 20
            }
            if(_v > 100)  _v = 20;
        }catch (e){
            _v= 20;
        }
    }
    return _v;
}
var genJsonRes = exports.genJsonRes ={
    genSuccessRes({msg=null,result=null}){
        return {flag:this.FLAG.success,msg,result}
    },
    genErrorRes({msg=null,result=null}){
        return {flag:this.FLAG.error,msg,result}
    },
    FLAG:{
        error:'ERROR',
        success:'SUCCESSED'
    }
}
