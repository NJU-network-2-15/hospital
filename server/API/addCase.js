var express = require('express');
var router = express.Router();
var patientModel = require('../../public/Model/patientModel');
var caseModel = require('../../public/Model/caseModel');
var mongoose = require('mongoose');
let fs = require('fs');
let Busboy = require('busboy');


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
    var busboy = new Busboy({ headers: req.headers });
    //将流链接到busboy对象
    req.pipe(busboy);
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




//监听file事件获取文件(字段名，文件，文件名，传输编码，mime类型)
    busboy.on('file', function (filedname, file, filename, encoding, mimetype) {
        const path = '/images/case/' + caseID;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
        }
        //创建一个可写流
        let writeStream = fs.createWriteStream(path + '/' + filename);

        // //监听data事件，接收传过来的文件，如果文件过大，此事件将会执行多次，此方法必须写在file方法里
        // file.on('data', function (data) {
        //     writeStream.write(data);
        // });
        //
        // //监听end事件，文件数据接收完毕，关闭这个可写流
        // file.on('end', function (data) {
        //     writeStream.end();
        // });
        // 可能会出现同名文件
        console.log('start uploading file');
        casePicUrls.push({picUrl:path + '/' + filename});
        file.pipe(writeStream);
    });

    busboy.on('field', function(key, value, keyTruncated, valueTruncated) {//处理其他非文件字段
        console.log(key);
        console.log(value);
    });

    //监听finish完成事件,完成后重定向到百度首页
    busboy.on('finish', function () {
        console.log('upload file finished!');
    });

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



    // docs.save(function (err, doc) {
    //     if (err) {
    //         console.log(err.message);
    //         res.send('Failed');
    //     } else {
    //         res.send('Success');
    //     }
    // })
});

module.exports = router;
