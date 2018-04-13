var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var logger = require('../logger.js');

router.get('/board',function(req,res){


});

// 게시판 리스트 불러오기
router.post('/selectList',function(req,res){
    var sendData ={};

    var pageSize = 10;
    var currentPage =0;
    var endCurrentPage =0;

    if(req.body.currentPage === undefined){
        currentPage = 0;
        endCurrentPage= pageSize;
    }
    else{
        currentPage = ((req.body.currentPage-1)*pageSize);
        endCurrentPage = currentPage+pageSize;
        console.log('current page ' + currentPage);
        console.log('endCurrentPage ' + endCurrentPage);
    }
    logger.info('receiveData' ,currentPage);

    var sql =
        "SELECT AA.*                                            "+
        "FROM (                                                 "+
        "       SELECT                                          "+
        "           (SELECT COUNT(*) FROM BOARD) AS TOTAL_COUNT,"+
        "           @ROWNUM := @ROWNUM+1 AS ROWNUM,             "+
        "           BOARD.*                                     "+
        "       FROM                                            "+
        "           BOARD,                                      "+
        "           (SELECT @ROWNUM :=0) R                      "+
        "     ) AA                                              "+
        "LIMIT ?,?                                             ";
    pool.getConnection(function(err,connection){
        var query= connection.query(sql,[currentPage,endCurrentPage],function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }
            else{
                res.send(rows);
            }
            console.log(query.sql);
            connection.release();
        });
    });
});

router.post('/selectCount', function(req,res) {
    var sql = 'SELECT COUNT(*) AS TOTAL_COUNT FROM BOARD ';
    pool.getConnection(function (err, connection) {
        var query = connection.query(sql, function (err, rows, field) {
            if (err) {
                connection.release();
                throw err;
            }
            console.log(query.sql);
            connection.release();
        });
    })
});

router.post('/Insert',function (req, res) {
    var receiveData = req.body;

    console.log('BOARD INSERT' );
    var board= {
        "NAME" :receiveData.userName,
        "TITLE" : receiveData.title,
        "CONTENT": receiveData.content
    };
    var sql = 'INSERT INTO BOARD SET ?';


    pool.getConnection(function(err,connection){
        var query= connection.query(sql,board,function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }
            console.log(query.sql);
            connection.release();
        });
    });
});

module.exports = router;