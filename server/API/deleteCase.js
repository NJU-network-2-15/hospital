var express = require('express');
var router = express.Router();
var caseModel = require('../../public/Model/caseModel');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var id = req.query.caseID;
    caseModel.remove({'caseID': id}, function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            res.send('Success');
        }
    })

});


module.exports = router;
