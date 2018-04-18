var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var logger = require('../logger.js');

router.post('/check',function (req,res) {
    if(req.user === undefined){
        console.log('req.user undefined ',req.user);
        res.send({isSuccess: 'fail'})
    }
    else {
        console.log('req.user exsist' ,req.user);
        res.send({isSuccess: 'success'})
    }
});



module.exports=router;
