var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');

router.get('/board',function(req,res){


});

router.post('/insert',function (req, res) {
    var receiveData = req.body;

    var board= {
        "NUM" : receiveData.boardNum,
        "NAME" :receiveData.userName,
        "TITLE" : receiveData.title,
        "CONTENT": receiveData.content
    };
    var sql2 = 'INSERT INTO BOARD SET ?';


    pool.getConnection(function(err,connection){
        var query= connection.query(sql2,board,function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }
            console.log(query.sql);
            req.login(user,function(err){
                req.session.save(function(){
                    res.send(rows);
                })
            });
            connection.release();
        });
    });
})


module.exports = router;