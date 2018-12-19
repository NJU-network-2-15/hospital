var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('doctorInfo',{'doctorID':req.session.doctorID,'department':req.session.department});
});

module.exports = router;
