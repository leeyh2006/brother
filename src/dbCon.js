var mysql= require('mysql');
var db_config = require('../serverConfig.js');


var pool = mysql.createPool(
    {
        host : db_config.host,
        user : db_config.user,
        password : db_config.password,
        database : db_config.database,
        connectionLimit:20,
        waitForConnections:false
    }
);
module.exports=pool;
