var express = require('express');
var router = express.Router();
var doctorModel = require('../../public/Model/doctorModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
    account = req.query.account;
    pwd = req.query.password;

    doctorModel.find({'account': account, 'password': pwd}, {
        '_id': 0,
        'doctorID': 1,
        'doctorName': 1,
        'account':1,
        'password': 1
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
                res.send({
                    'doctorID': req.session.doctorID,
                    'doctorName': req.session.doctorName,
                    'account': req.session.account,
                    'password': req.session.password,
                    'url':'/doctorView'
                });
            } else {
                res.send('Failed');
            }
        }
    });
});

module.exports = router;
