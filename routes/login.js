var express = require('express');
var router = express.Router();

router.post('/loginCheck.json', function(req, res, next) {
    console.log('GET loginCheck.json');
    res.send('respond with a resource');
});

module.exports = router;
