var express = require('express');
var router = express.Router();
var caseModel = require('../../public/Model/caseModel');


/* GET users listing. */
router.get('/', function (req, res, next) {
    caseModel.find({}, {'_id': 0},function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            res.send(doc);
        }
    })

});


module.exports = router;
