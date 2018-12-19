var express = require('express');
var router = express.Router();
var caseModel = require('../../public/Model/caseModel');


/* GET users listing. */
router.get('/', function (req, res, next) {
    var department = req.query.caseType;
    caseModel.find({'caseType': department}, {'_id': 0},function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            res.send(doc);
        }
    })

});


module.exports = router;
