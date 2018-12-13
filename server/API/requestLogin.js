var express = require('express');
var router = express.Router();
var doctorModel = require('../../public/Model/doctorModel')

/* GET users listing. */
router.get('/', function(req, res, next) {
    dname = req.query.name;
    dpwd = req.query.pwd;
    doctorModel.find({'doctorName': dname, 'doctorPassword': dpwd}, {
        '_id': 0,
        'doctorID': 1,
        'doctorName': 1
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                req.session.doctorName = doc[0].doctorName;
                req.session.doctorID = doc[0].doctorID;
                console.log({'doctorID':req.session.doctorID,'doctorName':req.session.doctorName});
                res.send({'doctorID':req.session.doctorID,'doctorName':req.session.doctorName});
            } else {
                res.send('Failed');
            }
        }
    });
});

module.exports = router;
