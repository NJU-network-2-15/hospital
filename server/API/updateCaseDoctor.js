var express = require('express');
var router = express.Router();
var caseModel = require('../../public/Model/caseModel');
var doctorModel = require('../../public/Model/doctorModel');


Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, // 月份
        "d+": this.getDate(), // 日
        "h+": this.getHours(), // 小时
        "m+": this.getMinutes(), // 分
        "s+": this.getSeconds(), // 秒
        "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
        "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

router.get('/', function (req, res, next) {
    account = req.query.account;
    pwd = req.query.password;

    doctorModel.find({'account': account, 'password': pwd}, {
        '_id': 0,
    }).lean().exec(function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                next()
            } else {
                res.send('Failed');
            }
        }
    });
});

/* GET users listing. */
router.get('/', function (req, res, next) {
    var id = req.query.caseID;
    conditions = {
        doctorID:req.query.doctorID,
        doctorName:req.query.doctorName,
        doctorLevel:req.query.doctorLevel,
        proposal:req.query.proposal,
        responseTime:new Date().Format("yyyy-MM-dd hh:mm:ss")
    };
    caseModel.update({'caseID': id}, {$addToSet: {'solution':conditions}},function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            res.send('Success');
        }
    })
});


module.exports = router;
