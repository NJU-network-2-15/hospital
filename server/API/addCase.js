var express = require('express');
var router = express.Router();
var patientModel = require('../../public/Model/patientModel');
var caseModel = require('../../public/Model/caseModel');
var mongoose = require('mongoose');


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

/* GET users listing. */
router.post('/', function (req, res, next) {
    var account = req.body.account;
    var pwd = req.body.password;
    patientModel.find({'account': account, 'password': pwd}, {'_id': 0},function (err, doc) {
        if (err) {
            console.log(err.message);
            res.send('Failed');
        } else {
            if (doc.length > 0) {
                next();
            } else {
                res.send('Failed');
            }
        }
    })

});

router.post('/', function (req, res, next) {
    var patientID = req.body.patientID;
    var patientName = req.body.patientName;
    var caseID = new Date().getTime();
    var caseType = req.body.caseType;
    var gender = req.body.gender;
    var age = req.body.age;
    var phone = req.body.phone;
    var caseDescription = req.body.caseDescription;
    var startTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var lastTime = '';
    var casePicUrls = [];
    var medicalHistory = req.body.medicalHistory;
    var allergicHistory = req.body.allergicHistory;
    var picBody = JSON.parse(req.body.casePicUrls);
    if(picBody.length>0){
        for(let element in picBody){
            casePicUrls.push({'picUrl':element});
        }
    }
    var solution = [];
    var docs = new caseModel({
        '_id':mongoose.Types.ObjectId(),
        'patientID':patientID,
        'patientName':patientName,
        'caseID':caseID,
        'caseType':caseType,
        'gender':gender,
        'age':age,
        'phone':phone,
        'caseDescription':caseDescription,
        'startTime':startTime,
        'lastTime':lastTime,
        'casePicUrls':casePicUrls,
        'solution':solution,
        'medicalHistory':medicalHistory,
        'allergicHistory':allergicHistory
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
