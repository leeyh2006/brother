var express = require('express');
var router = express.Router();
var connection  = require('../../src/dbCon.js');

router.post('/loginCheck.json', function(req, res, next) {
    var receiveData = req.body;

    var sql =
        "SELECT COUNT(*) AS COUNT" +
        "  FROM USER  " +
        " WHERE USERID = " +"'"+receiveData.userId+"'"+
        "   AND USERPW = " +"'"+ receiveData.userPw+"'";

    connection.query(sql,function(err,rows,fields){
        if(!err){
            if(rows[0].COUNT == 1 ){
                res.send(rows);
            }
            else{
                res.send("fail");
            }
            console.log("[DEBUG] USER INFO SEARCHED " + rows[0].COUNT);
        }
        else
        {
            res.send(err);
        }

    });

});

module.exports = router;
