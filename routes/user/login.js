var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var passport =require('passport');
var KakaoStrategy =require('passport-kakao').Strategy;
;
passport.use('login-kakao',new KakaoStrategy({
        clientID: '8a31ef866bfe1f9c93006c6bfda573f7',
        callbackURL :'http://localhost:8080/oauth'
    },
    function (accesToken,refreshToken, profile, done) {
        console.log(profile);
        return done(null,profile);

    }
));
/* ***************** */


/* kakao oauth 로그인 */
router.get('/kakaoLogin',passport.authenticate('login-kakao'));


router.post('/loginCheck.json', function(req, res, next) {
    var receiveData = req.body;
    var userid = receiveData.userId
        ,userpw =receiveData.userPw;

    var sql =
        "SELECT COUNT(*) AS COUNT" +
        "  FROM USER  " +
        " WHERE USERID = ? " +
        "  AND USERPW = ? ";
    pool.getConnection(function(err,connection){
       var query= connection.query(sql,[userid,userpw],function(err,rows,fields){
            if(err){
                connection.release();
                throw err;
            }
            if(rows[0].COUNT == 1 ){
                console.log(query.sql);
                res.send(rows);
            }
            else{
                res.send("fail");
            }
            connection.release();
            console.log("[DEBUG] USER INFO SEARCHED " + rows[0].COUNT);
        });
    });


});

module.exports = router;
