var express = require('express');
var router = express.Router();
var pool  = require('../../src/dbCon.js');
var passport =require('passport');
var LocalStrategy =require('passport-local');

passport.use(new LocalStrategy({
    usernameField:'userId',
    passwordField:'userPw',
    passReqToCallback:true
},
    function(req,userId,userPw,done){
    if(userId=='master@nate.com'&& userPw == '1')
    {
        var user ={
            'userId':'hello',
            'email':'hello@world.com'
        }
        return done(null,user);
    }else{
        return done(null,false);
    }
    })
);

router.get('/login_success',ensureAuthenticated ,function(req,res){
    res.send(req.user);
})

router.post('/login',passport.authenticate('local',{failureRedirect:'/login_fail',failureFlash:true}),
    function(req,res){
        res.redirect('/login_success');
    });


function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { return next(); }
    // 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/login.html');
}
module.exports=router;
