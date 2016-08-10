
//DB config
var Sequelize = require('sequelize')
var logger = require('log4js').getLogger('SQL');
var exports = module.exports = null;

var exports = module.exports =new Sequelize('nodehill', 'root','root', {
    host: 'localhost',
    //dialect: 'mysql'|'sqlite'|'postgres'|'mssql',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    // SQLite only
    //storage: 'sqlite_db/good1.db',
    logging:logger.debug.bind(logger)
});

