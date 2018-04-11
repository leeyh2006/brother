var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var bkfd2Password  = require('pbkdf2-password');
var hasher = bkfd2Password();

var user = {
    "USERID": '',
    "USERPW": '',
    "USERTEL":'',
    "USERAD": ''
};

router.post('/join.json', function(req, res, next) {
    var receiveData = req.body;
    var sql2 = 'INSERT INTO USER SET ?';
    hasher
    (
        {
            password:receiveData.userPw,
            salt : '0B519F6F0DEA1103CF4E1A28DEEB2901549015300DBEA9467D904135AD4E244DBBA90A7A34E2E6FCED6D32215D45D8103909ADF1A1B5569A163A4BB52DE4A932'
        },
        function(err,pass,salt,hash) {
            user.USERID =receiveData.userId;
            user.USERPW =hash;
            user.USERTEL=receiveData.userTel;
            user.USERAD =receiveData.userAd;

            console.log('USERPW ' , user.USERPW);
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
        }
    );
});

module.exports = router;
