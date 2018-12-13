var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.redirect(301, '/pages/index.html');
  // res.location('/pages/index.html');
});

module.exports = router;
