var express = require('express');
var router = express.Router();
var doctorModel = require('../../public/Model/doctorModel')

/* GET users listing. */
router.get('/', function (req, res, next) {
    department = req.query.department;

    doctorModel.find({'department': department}, {
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
        'doctorID':1,
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                var arr = [];
                for(i = 0;i<doc.length;i++){
                    arr.push({
                        'description': doc[i].description,
                        'doctorName': doc[i].doctorName,
                        'hospital': doc[i].hospital,
                        'department': doc[i].department,
                        'doctorLevel': doc[i].doctorLevel,
                        'commend': doc[i].commend,
                        'grade': doc[i].grade,
                        'picUrl': doc[i].picUrl,
                        'age':doc[i].age,
                        'doctorID':doc[0].doctorID,
                    });

                }
                res.send(arr);
            } else {
                res.send('Failed');
            }
        }
    });
});

module.exports = router;

//默认搜索结果只有一个大夫
