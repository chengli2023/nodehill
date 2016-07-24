//process.env.NODE_ENV = "development";
process.env.NODE_ENV = "production";
process.env.PORT = "3000";

var express = require('express');

var app = express();

//Bootstrap app setting
require('./core/config/appSetting')(app);

//Bootstrap router config
require('./core/config/routerConfig')(app);


module.exports = app;
