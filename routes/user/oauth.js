var express = require('express');
var passport =require('passport');
var router = express.Router();


router.get('/oauth', passport.authenticate('login-kakao', {
    successRedirect: '/login',
    failureRedirect:'/login'
}));
module.exports = router;
