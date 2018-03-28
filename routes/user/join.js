var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');

router.post('/join.json', function(req, res, next) {

    var receiveData = req.body;

    var user = {
        "USERID": receiveData.userId,
        "USERPW": receiveData.userPw,
        "USERTEL":receiveData.userTel,
        "USERAD": receiveData.userAd
    };
    var sql2 = 'INSERT INTO USER SET ?';

    pool.getConnection(function(err,connection){
        var query= connection.query(sql2,user,function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }
            console.log(query.sql);
            res.send(rows);
            connection.release();
        });
    });

});

module.exports = router;
