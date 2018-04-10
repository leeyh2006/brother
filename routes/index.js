var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  var sendData ={};
  // console.log('req user' , req)
  if(req.user !=undefined){
      sendData=req.user._json;
      console.log(req.user._json);
  }
  res.render('index', sendData);
});

module.exports = router;
