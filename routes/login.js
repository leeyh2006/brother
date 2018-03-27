var express = require('express');
var router = express.Router();
var connection  = require('../src/dbCon.js');

router.post('/loginCheck.json', function(req, res, next) {
    connection.query('SELECT * FROM USER ',function(err,rows,fields){
        if(!err)
            console.log('the solution i s : ' + rows);
        else
            console.log('error');

    });
    res.send(res.data);
});

module.exports = router;
