var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 定义一个Schema
var caseInfoSchema = new Schema({
    _id:Schema.ObjectId,   // 或者 'productId':{type:String}
    patientID:String,
    caseID:String,
    caseDescription:String,
    caseType:String,
    picUrl:String,
    isManaged:String,
    doctorID:String,
    dialog:String
})

// 输出(导出)
module.exports = mongoose.model('caseInfo',caseInfoSchema,'caseInfo');

