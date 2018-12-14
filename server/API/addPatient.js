var express = require('express');
var router = express.Router();
var patientModel = require('../../public/Model/patientModel');
var mongoose = require('mongoose');


router.get('/', function (req, res, next) {
    var account = req.query.account;

    patientModel.find({'account': account}, {'_id': 0},function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {

                res.send('Failed');
            } else {
                next();
            }
        }
    })

});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var account = req.query.account;
    var pwd = req.query.password;
    var name = req.query.patientName;
    var gender = req.query.gender;
    var age = req.query.age;
    var phone = req.query.phone;
    var medical = req.query.medicalHistory;
    var allergic = req.query.allergicHistory;
    var iconUrl = "/";

    var docs = new patientModel({
        '_id':mongoose.Types.ObjectId(),
        'account':account,
        'patientID':new Date().getTime(),
        'patientName':name,
        'password':pwd,
        'gender':gender,
        'age':age,
        'phone':phone,
        'medicalHistory':medical,
        'allergicHistory':allergic,
        'iconUrl':iconUrl
    });

    docs.save(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            res.send('Success');
        }
    })


});

module.exports = router;


