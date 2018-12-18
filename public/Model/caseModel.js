var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 定义一个Schema
var caseInfoSchema = new Schema({
    _id:Schema.ObjectId,   // 或者 'productId':{type:String}
    patientID:String,
    patientName:String,
    caseID:String,
    caseType:String,
    gender:String,
    age:String,
    phone:String,
    caseDescription:String,
    startTime:String,
    lastTime:String,
    medicalHistory:String,
    allergicHistory:String,
    casePicUrls:[
        {
            picUrl: String
        }
    ],
    solution:[
        {
            doctorID:String,
            doctorName:String,
            doctorLevel:String,
            proposal:String,
            responseTime:String
        }
    ]

})

// 输出(导出)
module.exports = mongoose.model('caseInfo',caseInfoSchema,'caseInfo');

