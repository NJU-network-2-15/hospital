var express = require('express');
var router = express.Router();
var patientModel = require('../../public/Model/patientModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
    id = req.query.patientID;
    patientModel.find({'patientID': id}, {
        '_id':0,
        'account':1,
        'patientID':1,
        'patientName':1,
        'password':1,
        'gender':1,
        'age':1,
        'phone':1,
        'medicalHistory':1,
        'allergicHistory':1,
        'iconUrl':1
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                res.send({
                    'account': doc[0].account,
                    'patientID': doc[0].patientID,
                    'patientName': doc[0].patientName,
                    'password': doc[0].password,
                    'gender': doc[0].gender,
                    'age': doc[0].age,
                    'phone': doc[0].phone,
                    'medicalHistory': doc[0].medicalHistory,
                    'allergicHistory': doc[0].allergicHistory,
                    'iconUrl': doc[0].iconUrl,

                });
            } else {
                res.send('Failed');
            }
        }
    });
});

module.exports = router;

//默认搜索结果只有一个大夫
