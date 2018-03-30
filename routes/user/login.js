var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var passport =require('passport');
var KakaoStrategy =require('passport-kakao').Strategy;
;
passport.use('login-kakao',new KakaoStrategy({
        clientID: '8a31ef866bfe1f9c93006c6bfda573f7',
        callbackURL :'http://localhost:8080/login/oauth'
    },
    function (accesToken,refreshToken, profile, done) {
        // console.log(profile);
        return done(null,profile);

    }
));

// 카카오 프로필 세션 저장
passport.serializeUser(function(user,done){
    console.log('kakao serialize');
    // console.log(user);
    done(null,user);

});

passport.deserializeUser(function(user,done){
    console.log('kakao desialize');
    done(null,user);
});
/* ***************** */

/* kakao oauth 로그인 */
router.get('/kakaoLogin',passport.authenticate('login-kakao'));

router.get('/oauth', passport.authenticate('login-kakao', {
    failureRedirect:'/login/login_fail'
}),function(req,res){
    res.redirect('/login/login_success');
});

router.get('/login_success',function(req,res){
    console.log(req);
    res.send(req.user);

});

router.get('/login/login_fail',function (req,res,next) {
    console.log('kakao Login err');
    res.render('error', { title: 'Express' });

});

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

function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/');

}
module.exports = router;
