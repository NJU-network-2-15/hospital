var express = require('express');
var router = express.Router();
var doctorModel = require('../../public/Model/doctorModel');

/* GET users listing. */
router.get('/', function (req, res, next) {
    var id = req.query.doctorID;

    doctorModel.find({'doctorID': id}, {
        '_id': 0,
        'description': 1,
        'doctorName': 1,
        'hospital':1,
        'department':1,
        'doctorLevel':1,
        'commend': 1,
        'grade':1,
        'picUrl':1,
        'age':1,
        'doctorID':1
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                // res.send({
                //     'description': doc[0].description,
                //     'doctorName': doc[0].doctorName,
                //     'hospital': doc[0].hospital,
                //     'department': doc[0].department,
                //     'doctorLevel': doc[0].doctorLevel,
                //     'commend': doc[0].commend,
                //     'grade': doc[0].grade,
                //     'picUrl': doc[0].picUrl,
                // });
                res.send({
                    'description': doc[0].description,
                    'doctorName': doc[0].doctorName,
                    'hospital': doc[0].hospital,
                    'department': doc[0].department,
                    'doctorLevel': doc[0].doctorLevel,
                    'commend': doc[0].commend,
                    'grade': doc[0].grade,
                    'picUrl': doc[0].picUrl,
                    'age':doc[0].age,
                    'doctorID':doc[0].doctorID,
                });
            } else {
                res.send('Failed');
            }
        }
    });
});

module.exports = router;

//默认搜索结果只有一个大夫
