var express = require('express');
var router = express.Router();
var doctorModel = require('../../public/Model/doctorModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
    account = req.query.account;
    pwd = req.query.password;

    doctorModel.find({'account': account, 'password': pwd}, {
        '_id': 0,
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                req.session.doctorName = doc[0].doctorName;
                req.session.doctorID = doc[0].doctorID;
                req.session.account = doc[0].account;
                req.session.password = doc[0].password;
                req.session.doctorLevel = doc[0].doctorLevel;
                req.session.department = doc[0].department;
                req.session.description = doc[0].description;
                req.session.grade = doc[0].grade;
                req.session.commend = doc[0].commend;
                req.session.hospital = doc[0].hospital;
                req.session.picUrl = doc[0].picUrl;
                res.send({
                    'doctorID': req.session.doctorID,
                    'doctorName': req.session.doctorName,
                    'account': req.session.account,
                    'password': req.session.password,
                    'doctorLevel': req.session.doctorLevel,
                    'department': req.session.department,
                    'description': req.session.description,
                    'grade': req.session.grade,
                    'commend': req.session.commend,
                    'hospital': req.session.hospital,
                    'picUrl': req.session.picUrl,
                    // TODO
                    'url':'/doctorAllQuestions'
                });
            } else {
                res.send('Failed');
            }
        }
    });
});

module.exports = router;
