var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('allQuestions',{'patientName':req.session.patientName});
});

module.exports = router;
