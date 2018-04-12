var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var logger = require('../logger.js');

router.get('/board',function(req,res){


});

// 게시판 리스트 불러오기
router.post('/selectList',function(req,res){
    console.log('req.body' , req.body);
    var pageSize = 10;
    var currentPage =0;
    var endCurrentPage =0;

    if(req.body.currentPage === undefined){
        currentPage = 0;
        endCurrentPage= pageSize;
    }
    else{
        currentPage = (req.body.currentPage)*pageSize;
        endCurrentPage = currentPage+pageSize;
    }
    logger.info('receiveData' ,currentPage);

    var sql =
        "SELECT AAA.NUM AS NUM,                                            "+
        "       AAA.TITLE AS TITLE,                                        "+
        "       AAA.CONTENT AS CONTENT,                                    "+
        "       AAA.NAME AS NAME,                                          "+
        "       AAA.TOTAL_COUNT AS TOTAL_COUNT                             "+
        "  FROM (                                                          "+
        "         SELECT AA.*, (SELECT COUNT(*) FROM BOARD) AS TOTAL_COUNT "+
        "           FROM (                                                 "+
        "                  SELECT BOARD.*, NUM AS RNUM                     "+
        "                    FROM BOARD                                    "+
        "                ) AA                                              "+
        "       )AAA                                                       "+
        " WHERE  AAA.NUM BETWEEN ? AND ?                                   ";

    pool.getConnection(function(err,connection){
        var query= connection.query(sql,[currentPage,endCurrentPage],function(err,rows,field){
            if(err){
                logger.err('data base error');
                connection.release();
                throw err;
            }
            else{
                console.log(rows);
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