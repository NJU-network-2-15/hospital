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
                req.session.patientName = doc[0].patientName;
                req.session.patientID = doc[0].patientID;
                req.session.account = doc[0].account;
                req.session.password = doc[0].password;
                next()
            } else {
                res.send('Failed');
            }
        }
    });

})

/* GET users listing. */
router.get('/', function (req, res, next) {
    var account = req.query.account;
    var pwd = req.query.password;

    patientModel.find({'account': account, 'password': pwd}, {'_id': 0},function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                res.send(doc)
            } else {
                res.send('Failed');
            }
        }
    })



});

module.exports = router;


