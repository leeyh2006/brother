var express = require('express');
var router = express.Router();
var connection  = require('../../src/dbCon.js');

router.post('/loginCheck.json', function(req, res, next) {
    var receiveData = req.body;

    var sql =
        "SELECT USERID" +
        "  FROM USER  " +
        " WHERE USERID = " +"'"+receiveData.userId+"'"+
        "   AND USERPW = " +"'"+ receiveData.userPw+"'";

    connection.query(sql,function(err,rows,fields){
        if(!err){

            console.log('the solution i s : ' + rows[0].USERID);
            res.send(rows[0].USERID);
        }
        else
            console.log(err);

    });

});

module.exports = router;
