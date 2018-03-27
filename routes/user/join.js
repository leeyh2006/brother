var express = require('express');
var router = express.Router();
var connection  = require('../../src/dbCon.js');

router.post('/join.json', function(req, res, next) {
    res.send(res.data);
});

module.exports = router;
