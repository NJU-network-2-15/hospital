var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('sessionID : ', req.session.doctorID);
    // if(req.session.doctorID){
    //     res.render('doctorview',{'doctorID':req.session.doctorID,'doctorName':req.session.doctorName});
    // }else{
    //     res.redirect(301, '/doctorLogin');
    // }
    // res.render('doctorview',{'doctorID':req.session.doctorID,'doctorName':req.session.doctorName});
    res.render('Allquestions');
    // res.send()
});

module.exports = router;
