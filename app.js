var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./server/routes/index');
var requestLogin = require('./server/API/requestDoctorLogin');
var requestPatientLogin = require('./server/API/requestPatientLogin');
var updatePatientInfo = require('./server/API/updatePatientInfo')
var doctorViewRouter = require('./server/routes/doctorView');
var LoginRouter = require('./server/routes/login');
var doctorInfoByName = require('./server/API/requestDoctorInfoByName');
var doctorInfoByDepartment = require('./server/API/requestDoctorInfoByDepartment');
var patientInfo = require('./server/API/requestPatientInfo');
var mooc = require('./server/routes/mooctest');
var addCase = require('./server/API/addCase');
var addPatient = require('./server/API/addPatient');
var requestAllCasePatient = require('./server/API/requestAllCasePatient');
var requestAllCaseDoctor = require('./server/API/requestAllCaseDoctor');
var requestAllCase = require('./server/API/requestAllCase');
var deleteCase = require('./server/API/deleteCase');
var updateCaseDoctor = require('./server/API/updateCaseDoctor');
var updateCasePatient = require('./server/API/updateCasePatient');
var doctorAllQuestions = require('./server/routes/doctorAllQuestions');
var doctorUpdateCase = require('./server/routes/doctorUpdateCase');

var allQuestions = require('./server/routes/allQuestions');
var patientview = require('./server/routes/patientInfo');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
// 使用 session 中间件
app.use(session({
  secret :  'hospital', // 对session id 相关的cookie 进行签名
  resave : true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
    path: '/',
    httpOnly: true,
    maxAge : 1000 * 60 * 60 * 24, // 设置 session 的有效时间，单位毫秒
  },
}));

// view engine setup
app.set('views', path.join(__dirname, 'server', 'views'));
// app.set('view engine', 'html');
// app.engine( 'html', require( 'ejs' ).__express );

app.set('view engine', 'ejs');
// app.engine( 'html', require( 'ejs' ).__express );

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  // res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/pages', express.static(path.join(__dirname, 'server', 'views')));

// router
app.use('/', indexRouter);
app.use('/doctorView', doctorViewRouter);
app.use('/login', LoginRouter);
app.use('/patientInfo', patientview);
app.use('/allQuestions', allQuestions);
app.use('/doctorAllQuestions', doctorAllQuestions);
app.use('/doctorUpdateCase', doctorUpdateCase);




// api
app.use('/API/requestPatientLogin', requestPatientLogin);
app.use('/API/updatePatientInfo', updatePatientInfo);
app.use('/API/requestDoctorLogin', requestLogin);
app.use('/API/requestDoctorInfoByName', doctorInfoByName);
app.use('/API/requestDoctorInfoByDepartment', doctorInfoByDepartment);
app.use('/API/requestPatientInfo', patientInfo);
app.use('/API/requestAllCasePatient', requestAllCasePatient);
app.use('/API/requestAllCaseDoctor', requestAllCaseDoctor);
app.use('/API/requestAllCase', requestAllCase);
app.use('/API/addCase', addCase);
app.use('/API/addPatient', addPatient);
app.use('/API/deleteCase', deleteCase);
app.use('/API/updateCaseDoctor', updateCaseDoctor);
app.use('/API/updateCasePatient', updateCasePatient);

app.use('/mooc', mooc);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
})
mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
})
mongoose.connect('mongodb://134.175.124.206:27017/hospital');


module.exports = app;
