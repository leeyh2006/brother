var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var logger = require('../logger.js');
var multipart      = require('connect-multiparty');
router.post('/selectList',function(req,res){
    console.log('come in');
});
/*
router.post('/insertPatent',multipart,function (req, res, next) {
    console.log('hello');
}
    /!*function (req,res) {

    console.log('reqbody', req.body.file.name);
    var sqlInsertFile = 'INSERT INTO FILE SET ?';
    var sqlInsertPatent = 'INSERT INTO PATENT SET ?';

    /!*pool.getConnection(function(err,connection){
        var query= connection.query(sqlInsertFile,function(err,rows,field){
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
        var query2 = connection.query(sqlInsertPatent,function (err,rows,field) {
            if(err)
            {
                connection.release();
                throw err;

            }else{
                console.log(query2.sql);
                res.send(rows);
            }
            connection.release();

        });


    });*!/
}*!/);*/

router.post('/insertPatent', multipart(), function(req, res) {
    var file = req.files.file;
    console.log(file.name);
    console.log(file.type);
    console.log(file.path);
});

module.exports=router;