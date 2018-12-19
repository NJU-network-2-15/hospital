var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('doctorAllQuestions',{
        'doctorID':req.session.doctorID,
        'department':req.session.department,
        'account':req.session.account,
        'password':req.session.password,
        'doctorLevel':req.session.doctorLevel,
        'doctorName':req.session.doctorName,
    });
});

module.exports = router;
