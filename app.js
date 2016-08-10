process.env.NODE_ENV = "development";
// process.env.NODE_ENV = "production";
process.env.PORT = "3001";

var express = require('express');

var app = express();

//Bootstrap app setting
require('./core/config/appSetting')(app);


module.exports = app;
