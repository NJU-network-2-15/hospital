var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 定义一个Schema
var doctorInfoSchema = new Schema({
    _id:Schema.ObjectId,   // 或者 'productId':{type:String}
    doctorID:String,
    doctorName:String,
    description:String
})

// 输出(导出)
module.exports = mongoose.model('doctorInfo',doctorInfoSchema,'doctorInfo');

