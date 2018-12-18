var ajaxURL = "/API/";
var requestPatientInfo = "requestPatientInfo";
var requestAllCasePatient = "requestAllCasePatient";
var patientInfo;
var patientCase;
var patientID = document.getElementById('session.patientID').innerHTML;
$.ajax({
    type: 'GET',
    async: false,//设置成同步
    url: ajaxURL + requestPatientInfo,
    // dataType: "json",
    data: {'patientID': patientID},//<------------------换成登录者的patientID
    success: function (result) {
        patientInfo = result;
        console.log(patientInfo);
    },
    error: function () {
        alert('服务器走丢了');
    }
});

$.ajax({
    type: 'GET',
    async: false,//设置成同步
    url: ajaxURL + requestAllCasePatient,
    // dataType: "json",
    data: {'patientID': patientID},//<------------------换成登录者的patientID
    success: function (result) {
        patientCase = result;
        console.log(patientCase);
    },
    error: function () {
        alert('服务器走丢了');
    }
});

var patientName = document.getElementById('patientName');
patientName.innerHTML = patientInfo['patientName'];
var age = document.getElementById('age');
age.innerHTML = patientInfo.age + "岁";
var patientID = document.getElementById('patientID');
patientID.innerHTML = patientInfo.patientID;
var gender = document.getElementById('gender');
gender.innerHTML = patientInfo.gender;
var phone = document.getElementById('phone');
phone.innerHTML = patientInfo.phone;
var medicalHistory = document.getElementById('medicalHistory');
medicalHistory.innerHTML = patientInfo.medicalHistory;
var allergicHistory = document.getElementById('allergicHistory');
allergicHistory.innerHTML = patientInfo.allergicHistory;

var tbody = document.getElementById('tbMain');
if(patientCase!='Failed'){
    for (var i = 0; i < patientCase.length; i++) { //遍历一下json数据
        var trow = getDataRow(patientCase[i]); //定义一个方法,返回tr数据
        tbody.appendChild(trow);
    }
}
function getDataRow(h) {
    var row = document.createElement('tr'); //创建行
    var state = document.createElement('td'); //创建第一列caseID
    var span = document.createElement('span');
    if (h.lastTime == "") {
        span.setAttribute('class', 'label label-danger');
        span.innerHTML = "未完成";
    } else {
        span.setAttribute('class', 'label label-success');
        span.innerHTML = "完成";
    }
    state.appendChild(span);
    row.appendChild(state);
    var caseID = document.createElement('td'); //创建第一列caseID
    caseID.innerHTML = h.caseID;
    row.appendChild(caseID);
    var caseType = document.createElement('td');//创建第三列caseType
    caseType.innerHTML = h.caseType;
    row.appendChild(caseType);
    var caseDescription = document.createElement('td');//创建第四列caseDescription
    caseDescription.innerHTML = h.caseDescription;
    row.appendChild(caseDescription);
    var startTime = document.createElement('td');//创建第五列startTime
    startTime.innerHTML = h.startTime;
    row.appendChild(startTime);
    var lastTime = document.createElement('td');//创建第六列lastTime
    if (h.lastTime == "") {
        lastTime.innerHTML = "未完成";
    } else {
        lastTime.innerHTML = h.lastTime;
    }
    row.appendChild(lastTime);
    var details = document.createElement('td');//创建第六列lastTime

    var button = document.createElement('input'); //创建一个input控件
    button.setAttribute('type', 'button'); //type="button"
    button.setAttribute('value', '点击查看该病例');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#myModal');

    var myModal = document.createElement('div');
    myModal.setAttribute('class', 'modal fade');
    myModal.setAttribute('id', 'myModal');
    myModal.setAttribute('tabindex', '-1');
    myModal.setAttribute('role', 'dialog');
    myModal.setAttribute('aria-labelledby', 'myModalLabel');

    var modal_dialog = document.createElement('div');
    ;
    modal_dialog.setAttribute('class', 'modal-dialog');
    modal_dialog.setAttribute('role', 'document');

    var modal_content = document.createElement('div');
    modal_content.setAttribute('class', 'modal-content');

    var modal_header = document.createElement('div');
    modal_header.setAttribute('class', 'modal-header');

    var myModalLabel = document.createElement('h4');
    myModalLabel.setAttribute('class', 'myModalLabel');
    myModalLabel.innerHTML = h.patientName + '的病例';

    modal_header.appendChild(myModalLabel);

    var modal_body = document.createElement('div');
    modal_body.setAttribute('class', 'modal-body');

    var body = document.createElement('div');
    var description = document.createElement('span');
    description.setAttribute('class','label label-primary');
    description.innerHTML = '病例描述';

    body.innerHTML = h.caseDescription;

    modal_body.appendChild(description);
    modal_body.appendChild(body);

    var modal_footer = document.createElement('div');
    modal_footer.setAttribute('class', 'modal-footer');

    var close = document.createElement('button');
    close.setAttribute('class', 'btn btn-default');
    close.setAttribute('data-dismiss', 'modal');
    close.innerHTML = '关闭';

    modal_footer.appendChild(close);

    modal_content.appendChild(modal_header);
    modal_content.appendChild(modal_body);
    modal_content.appendChild(modal_footer);
    modal_dialog.appendChild(modal_content);
    myModal.appendChild(modal_dialog);
    details.appendChild(button);
    details.appendChild(myModal);
    row.appendChild(details);
    return row; //返回tr数据
}
