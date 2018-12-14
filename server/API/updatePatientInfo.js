var express = require('express');
var router = express.Router();
var patientModel = require('../../public/Model/patientModel');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var account = req.query.account;
    var pwd = req.query.old_password;
    patientModel.find({'account': account, 'password': pwd}, {'_id': 0},function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                next();
            } else {
                res.send('Failed');
            }
        }
    })

});

router.get('/', function (req, res, next) {
    var account = req.query.account;
    var pwd = req.query.password;
    var uname = req.query.patientName;
    var gender = req.query.gender;
    var age = req.query.age;
    var phone = req.query.phone;
    var medicalHistory = req.query.medicalHistory;
    var allergicHistory = req.query.allergicHistory;
    updates = {
        'password':pwd,
        'patientName':uname,
        'gender':gender,
        'age':age,
        'phone':phone,
        'medicalHistory':medicalHistory,
        'allergicHistory':allergicHistory
    };

    patientModel.update({'account': account}, {$set:updates}, function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            res.send('Success');
        }
    })
});

module.exports = router;
