
//DB config
var Sequelize = require('sequelize')
var logger = require('log4js').getLogger('SQL');

var exports = module.exports =new Sequelize('good1', null,null, {
    host: 'localhost',
    //dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
    dialect: 'sqlite',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    storage: 'sqlite_db/good1.db',
    logging:logger.debug.bind(logger)
});

