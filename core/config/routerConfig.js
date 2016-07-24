/**
 * Created by Administrator on 2015/4/22.
 */
var grantConfig = require('./grantConfig');
var path = require('path');
var fs = require('fs');
module.exports = function (app) {

    //Granted Authority
    app.use(require('../../lib/authorization')(grantConfig));

    //Application router
    var controllerDir = path.join(__dirname, '../controller/');
    fs.readdirSync(controllerDir).forEach(function (file) {
        if (~file.indexOf('.js')){
            var router = require(controllerDir + file);
            app.use(router.$requestMapping,router)
        }
    });


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
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};
