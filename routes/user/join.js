var express = require('express');
var router = express.Router();
var connection  = require('../../src/dbCon.js');

router.post('/join.json', function(req, res, next) {

    var receiveData = req.body;
    var sql = 'INSERT INTO USER(USERID,USERPW, USERTEL,USERAD)' +
        '      VALUES ('+ "'"+receiveData.userId+"' ,"+
                           "'"+receiveData.userPw+"' ,"+
                           "'"+receiveData.userTel+"' ,"+
                           "'"+receiveData.userAd+"'"+')';
    connection.query(sql,function(err,rows,field){
        if(!err){
            res.send(rows);
            console.log('data insert success');
        }
        else{

            console.log(err);
            res.send("fail");
        }
    });
});

module.exports = router;
