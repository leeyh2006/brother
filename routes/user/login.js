var express         = require('express');
var router          = express.Router();
var pool            = require('../../src/dbCon.js');
var passport        = require('passport');
var KakaoStrategy   = require('passport-kakao').Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var bkfd2Password  = require('pbkdf2-password');
var hasher = bkfd2Password();

/* passport Local 정보 셋팅 */
passport.use(new LocalStrategy(
    function(username,password,done){
        var  userid  = username,
             userpw  = password ;
        var sql =
            "SELECT USERID,    " +
            "       USERPW,    " +
            "       USERNAME   " +
            "  FROM USER       " +
            " WHERE USERID = ? " +
            "   AND USERPW = ? ";
        hasher(
            {
            password:userpw,
            salt : '0B519F6F0DEA1103CF4E1A28DEEB2901549015300DBEA9467D904135AD4E244DBBA90A7A34E2E6FCED6D32215D45D8103909ADF1A1B5569A163A4BB52DE4A932'
            }, function(err,pass,salt,hash){
            pool.getConnection(function(err,connection){
                var query= connection.query(sql,[userid,hash],function(err,rows,fields){
                    if(err){
                        connection.release();
                        throw err;
                    }
                    if(rows[0] !=undefined){
                        console.log(query.sql);
                        done(null, rows[0]);
                    }
                    else{
                        console.log(err);
                        done(null,false); //회원 정보가 없을시
                    }
                    connection.release();
                });
            })
        });
        // done(null,false);
    }
));
/*  passport local 로그인 */
router.post('/login',
    passport.authenticate(
        'local',
        {
            failureRedirect:'/login'
        }
    ),
    function (req,res) {
        res.send(req.user);
    }
);

/* passpprt session 삭제 */
router.post('/logOut',
    function (req,res) {
        req.logout(); //로그아웃
        res.send({'isSuccess:': 'true'})
    }
);


passport.serializeUser(function(user,done){
    console.log('[serializeUser]', user);
    done(null,user);
});

// 다음 페이지에서 들어올때 정보 저장
passport.deserializeUser(function(id, done) {
    console.log('[deserializeUser]', id);
    done(null, id);
});



/*
passport.use('login-kakao',new KakaoStrategy({
        clientID: '8a31ef866bfe1f9c93006c6bfda573f7',
        callbackURL :'http://localhost:8080/login/oauth'
    },
    function (accesToken,refreshToken, profile, done) {
        // console.log(profile);
        return done(null,profile);

    }
));*/


/*
// 카카오 프로필 세션 저장
passport.serializeUser(function(user,done){
    // console.log(user);
    done(null,user);

});*/


/*
passport.deserializeUser(function(user,done){
    console.log('kakao desialize');
    done(null,user);
});*/
/*
* */
/*
/!* kakao oauth 로그인 *!/
router.get('/kakaoLogin',passport.authenticate('login-kakao'));

router.get('/oauth', passport.authenticate('login-kakao', {
    failureRedirect:'/login/login_fail'
}),function(req,res){

    var userInfo = req.user._json;

    var user = {
        "USERID": "leeyh2006@nate.com",35
        "KAKAO_MAIL": userInfo.kaccount_email,
        "KAKAO_THUMNAIL_URL":userInfo.properties.profile_image
    };
    var sql2 = 'INSERT INTO USER SET ?';
    pool.getConnection(function(err,connection){
        var query= connection.query(sql2,user,function(err,rows,field){
            if(err){
                connection.release();
                throw err;
            }
            console.log(query.sql);
            res.redirect('/');
            connection.release();
        });
    });

});*/



/*
router.post('/loginCheck.json', function(req, res, next) {
    var receiveData = req.body;
    var userid = receiveData.userId
        ,userpw =receiveData.userPw;

    var sql =
        "SELECT COUNT(*) AS COUNT" +
        "  FROM USER  " +
        " WHERE USERID = ? " +
        "   AND USERPW = ? ";
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
});*/

module.exports = router;
