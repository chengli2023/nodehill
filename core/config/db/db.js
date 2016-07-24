
//DB config
var Sequelize = require('sequelize')
var logger = require('log4js').getLogger('SQL');
/*
 var exports = module.exports = new Sequelize('gzh003_db', 'root', 'lincel+', {
 host: '121.40.119.230',
 dialect: 'mysql',
 pool: {
 max: 8,
 min: 0,
 idle: 10000
 }
 });
 */


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
    storage: '/Users/licheng/Documents/huaxun/iRecommend-demo/sqlite_db/good1.db',
    logging:logger.debug.bind(logger)
});

