var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({'times':req.session.times, 'content':'respond with a resource'});
});

module.exports = router;
