var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientInfoSchema = new Schema({
    _id:Schema.ObjectId,   // 或者 'productId':{type:String}
    patientID:String,
    account:String,
    password:String,
    patientName:String,
    gender:String,
    age:String,
    phone:String,
    medicalHistory:String,
    allergicHistory:String,
    iconUrl:String
})

// 输出(导出)
module.exports = mongoose.model('patientInfo',patientInfoSchema,'patientInfo');

