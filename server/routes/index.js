var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.session)
  console.log(req.session.doctorID)
  if(!req.session.doctorID){
    res.redirect(301, '/doctorLogin');
  }
  else {
    res.redirect(301, '/doctorView');
  }


  // res.location('/pages/index.html');
});

module.exports = router;
