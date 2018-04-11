var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var sendData ={};
  // console.log('req user' , req)
  if(req.user !=undefined){
      console.log(req.user.USERID);
  }
  res.render('index', sendData);
});

module.exports = router;
