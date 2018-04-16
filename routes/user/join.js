var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var bkfd2Password  = require('pbkdf2-password');
var hasher = bkfd2Password();
var serverConfig = require('../../serverConfig.js');

router.post('/join.json', function(req, res, next) {
    var user = {
        "USERID": '',
        "USERPW": '',
        "USERTEL":'',
        "USERAD": '',
        "USERNAME":''
    };
    var receiveData = req.body;
    var sql = 'SELECT COUNT(*) AS COUNT' +
        '        FROM USER' +
        '       WHERE USERID = ?';

    var sql2 = 'INSERT INTO USER SET ?';

    hasher
    (
        {
            password:receiveData.userPw,
            salt : serverConfig().passWordConfig.salt
        },
        function(err,pass,salt,hash) {
            user.USERID =receiveData.userId;
            user.USERPW =hash;
            user.USERTEL=receiveData.userTel;
            user.USERAD =receiveData.userAd;
            user.USERNAME = receiveData.userName;

            pool.getConnection(function(err,connection){
                var checkId = connection.query(sql,[user.USERID],function(err,rows,field){
                    if(err){
                        res.send(err.code);
                        console.log('중복체크 ' ,rows);
                        connection.release();
                        throw err;
                    }
                    else{
                        if(rows[0].COUNT ==1){ // 아이디가 있을시
                            res.send({
                                isSuccess: 'fail', msg: '아이디 중복'
                            });
                            console.log('아이디 중복');
                        }
                        else if(rows[0].COUNT==0){
                            var query= connection.query(sql2,user,function(err,rows,field){
                                if(err){
                                    connection.release();
                                    throw err;
                                }
                                console.log(query.sql);
                                req.login(user,function(err){
                                    if(err){
                                        throw err;
                                    }
                                    req.session.save(function(){
                                        console.log('회원가입 성공');
                                        res.send(rows);
                                    })
                                });
                                connection.release();
                            });
                        }
                    }
                });

            });
        }
    );
});

module.exports = router;
