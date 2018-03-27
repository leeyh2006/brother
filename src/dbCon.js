var mysql= require('mysql');
var db_config = require('../serverConfig.js');


var connection = mysql.createConnection(
    {
        host : db_config.host,
        user : db_config.user,
        password : db_config.password,
        database : db_config.database
    }
);
connection.connect();

module.exports= connection;
