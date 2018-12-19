var express = require('express');
var router = express.Router();
var patientModel = require('../../public/Model/patientModel');


router.get('/', function (req, res, next) {
    var account = req.query.account;
    var pwd = req.query.password;
    patientModel.find({'account': account, 'password': pwd}, {
        '_id': 0,
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                next()
            } else {
                res.send('Failed');
            }
        }
    });

});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var account = req.query.account;
    var pwd = req.query.password;

    patientModel.find({'account': account, 'password': pwd}, {
        '_id': 0,
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                req.session.patientID = doc[0].patientID;
                req.session.account = doc[0].account;
                req.session.patientName = doc[0].patientName;
                req.session.password = doc[0].password;
                req.session.gender = doc[0].gender;
                req.session.age = doc[0].age;
                req.session.phone = doc[0].phone;
                req.session.medicalHistory = doc[0].medicalHistory;
                req.session.allergicHistory = doc[0].allergicHistory;
                req.session.iconUrl = doc[0].iconUrl;
                res.send({
                    'patientID': req.session.patientID,
                    'account': req.session.account,
                    'patientName': req.session.patientName,
                    'password': req.session.password,
                    'gender': req.session.gender,
                    'age': req.session.age,
                    'phone': req.session.phone,
                    'medicalHistory': req.session.medicalHistory,
                    'allergicHistory': req.session.allergicHistory,
                    'iconUrl': req.session.iconUrl,
                    'url':'/patientInfo'
                });
            } else {
                res.send('Failed');
            }
        }
    });



});

module.exports = router;


