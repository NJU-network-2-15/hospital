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


router.post('/', function (req, res, next) {
    var busboy = new Busboy({ headers: req.headers });
    //将流链接到busboy对象
    req.pipe(busboy);
    var caseID = new Date().getTime();
    var startTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
    var lastTime = '';
    var solution = [];
    var casePicUrls = [];
    var docs = new caseModel({
        '_id':mongoose.Types.ObjectId(),
        'caseID':caseID,
        'startTime':startTime,
        'lastTime':lastTime,
        'solution':solution,
    });




//监听file事件获取文件(字段名，文件，文件名，传输编码，mime类型)
    busboy.on('file', function (filedname, file, filename, encoding, mimetype) {
        const base = '/hospital/hospital/public';
        const path = '/images/case/' + caseID;
        if (!fs.existsSync(base + path)) {
            fs.mkdirSync(base + path);
        }
        //创建一个可写流
        const fname = new Date().getTime();
        let writeStream = fs.createWriteStream(base + path + '/' + fname);


        console.log('start uploading file');
        casePicUrls.push({'picUrl':path + '/' + fname});
        docs['casePicUrls'] = JSON.stringify(casePicUrls);
        file.pipe(writeStream);
    });

    busboy.on('field', function(key, value, keyTruncated, valueTruncated) {//处理其他非文件字段
        docs[key] = value;
    });

    //监听finish完成事件,完成后重定向到百度首页
    busboy.on('finish', function () {
        console.log('upload file finished!');
        docs.save(function (err, doc) {
            if (err) {
                console.log(err.message);
                res.send('Failed');
            } else {
                res.send('Success');
            }
        })
    });



});

module.exports = router;
