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
        "LIMIT ?,?                                              ";

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

router.post('/Insert',function (req, res) {
    var receiveData = req.body;

    console.log('BOARD INSERT' );
    var board= {
        "NAME" :req.user.USERNAME,
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

//게시판 상세보기
router.post('/selectDetail',function (req,res) {
    var receiveData = req.body;
    var boardNum = receiveData.boardNum;
    var sql =
        '  SELECT  *       ' +
        '    FROM  BOARD    ' +
        '   WHERE  NUM = ?  ';
    pool.getConnection(function(err,connection){
        var query= connection.query(sql,[boardNum],function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }else{
                console.log(query.sql);
                console.log('[BOARD DETAIL] ', rows);
                res.send(rows);
            }
            connection.release();
        });
    });
});
router.post('/updateBoard',function(req,res){
    var receiveData = req.body;
    var boardData = {
        "TITLE": receiveData.detailTitle,
        "CONTENT":receiveData.detailContent
    }
    var boardNum = receiveData.boardNum;

    var sql =
        ' UPDATE  BOARD         ' +
        '    SET  ?   ' +
        '  WHERE  NUM = ?  ';

    pool.getConnection(function(err,connection){
        var query= connection.query(sql,[boardData,boardNum],function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }else{
                console.log(query.sql);
                res.send({
                    isSuccess: 'true',
                    msg :'수정 성공'
                });
            }
            connection.release();
        });
    });

});


//게시글 삭제
router.post('/deleteBoard',function (req,res) {
    var receiveData = req.body;
    var boardNum = receiveData.boardNum;

    console.log('[DELETE BOARD]  boardNum', boardNum);
    var sql =
        ' DELETE         ' +
        '   FROM  BOARD    ' +
        '  WHERE  NUM = ?  ';

    pool.getConnection(function(err,connection){
        var query= connection.query(sql,[boardNum],function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }else{
                res.send({
                    isSuccess: 'true',
                    msg :'삭제 성공'
                });
            }
            connection.release();
        });
    });
});

module.exports = router;