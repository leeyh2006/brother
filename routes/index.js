var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var sendData ={isSuccess : 'false' };

    //로그인 성공시
    if(req.user !=undefined){
        req.user.isSuccess = 'true';
        res.render('index',req.user);
    }else{
        res.render('index', sendData);
    }

});

module.exports = router;
