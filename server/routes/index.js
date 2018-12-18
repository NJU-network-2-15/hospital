var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  console.log(req.session.doctorID)
  if(!req.session.doctorID){
    res.redirect(301, '/login');
  }
  else {
    res.redirect(301, '/doctorView');
  }

});

module.exports = router;
