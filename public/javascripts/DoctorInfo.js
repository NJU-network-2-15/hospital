var ajaxURL = "/API/";
var requestDoctorInfo = "requestDoctorInfoByID";
var requestAllCaseDoctor = "requestAllCaseDoctor";
var doctorInfo;
var doctorCase;
var doctor_id = document.getElementById('session.doctorID').innerHTML;
var type = document.getElementById('session.department').innerHTML;
$.ajax({
    type: 'GET',
    async: false,//设置成同步
    url: ajaxURL + requestDoctorInfo,
    // dataType: "json",
    data: {'doctorID': doctor_id},//<------------------换成科室
    success: function (result) {
        doctorInfo = result;
        console.log(doctorInfo);
    },
    error: function () {
        alert('服务器走丢了');
    }
});

$.ajax({
    type: 'GET',
    async: false,//设置成同步
    url: ajaxURL + requestAllCaseDoctor,
    // dataType: "json",
    data: {'caseType': type},//<------------------换成科室
    success: function (result) {
        doctorCase = result;
        console.log(doctorCase);
    },
    error: function () {
        alert('服务器走丢了');
    }
});

/*此处已修改*/
var doctorIcon = document.getElementById('doctorIcon');
doctorIcon.setAttribute('src', doctorInfo.picUrl);
/*此处已修改*/
var doctorNameIcon = document.getElementById('doctorNameIcon');
doctorNameIcon.innerHTML = doctorInfo.doctorName;
var doctorLevel = document.getElementById('doctorLevel');
doctorLevel.innerHTML = doctorInfo.doctorLevel;
var doctorID = document.getElementById('doctorID');
doctorID.innerHTML = doctorInfo.doctorID;
var department = document.getElementById('department');
department.innerHTML = doctorInfo.department;
var age = document.getElementById('age');
age.innerHTML = doctorInfo.age + "岁";
var hospital = document.getElementById('hospital');
hospital.innerHTML = doctorInfo.hospital;
var description = document.getElementById('description');
description.innerHTML = doctorInfo.description;

var tbody = document.getElementById('tbMain');
if(doctorCase!='Failed'){
    for (var i = 0; i < doctorCase.length; i++) { //遍历一下json数据
        var trow = getDataRow(doctorCase[i],i); //定义一个方法,返回tr数据
        tbody.appendChild(trow);
    }
}
/*此处已修改*/
function getDataRow(h, i) {
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
    var doctorName = document.createElement('td');//创建第二列doctorName
    doctorName.innerHTML = h.doctorName;
    row.appendChild(doctorName);
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
    details.setAttribute("id", "tz");
    var button = document.createElement('input'); //创建一个input控件
    button.setAttribute('type', 'button'); //type="button"
    button.setAttribute('value', '点击查看该病例');
    button.setAttribute('class', 'btn btn-primary');
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#myModal' + i);

    document.write("<div class=\"modal fade\" id=\"myModal" + i + "\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\" aria-hidden=\"true\">\n" +
        "    <div class=\"modal-dialog\">\n" +
        "        <div class=\"modal-content\">\n" +
        "            <div class=\"modal-header\">\n" +
        "                <h4 class=\"modal-title\" id=\"myModalLabel" + i + "\">\n" +
        "                </h4>\n" +
        "            </div>\n" +
        "            <div class=\"modal-body\" id=\"myModalBody" + i + "\">\n" +
        "            </div>\n" +
        "            <div class=\"modal-footer\">\n" +
        "                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">关闭\n" +
        "                </button>\n" +
        "            </div>\n" +
        "        </div><!-- /.modal-content -->\n" +
        "    </div><!-- /.modal -->\n" +
        "</div>");

    var myModalLabel = document.getElementById("myModalLabel" + i);

    myModalLabel.innerHTML = h.doctorName + '的病例';

    var myModalBody = document.getElementById("myModalBody" + i);

    var modal_state = document.createElement('span');
    if (h.lastTime == "") {
        modal_state.setAttribute('class', 'label label-danger');
        modal_state.innerHTML = "未完成";
    } else {
        modal_state.setAttribute('class', 'label label-success');
        modal_state.innerHTML = "完成";
    }
    myModalBody.appendChild(modal_state);

    var body = document.createElement('div');
    var description = document.createElement('h4');
    description.innerHTML = '病例描述';
    myModalBody.appendChild(description);
    body.innerHTML = h.caseDescription;
    myModalBody.appendChild(body);

    var casePicUrlsDiv = document.createElement('div');
    for (j = 0; j < h.casePicUrls.length; j++) {
        if (h.casePicUrls[j].picUrl != "0") {
            var pics = document.createElement("img");
            pics.style.width = '100px';
            pics.style.height = '100px';
            pics.setAttribute('src', "http://134.175.124.206:3000" + h.casePicUrls[j].picUrl);
            casePicUrlsDiv.appendChild(pics);
        }
    }
    myModalBody.appendChild(casePicUrlsDiv);

    if (h.solution.length > 0) {
        var solution = document.createElement('div');
        var solutionTitle = document.createElement('h4');
        solutionTitle.innerHTML = '医生' + h.solution[0].doctorName + '给出的建议' + '   时间：' + h.solution[0].responseTime;
        myModalBody.appendChild(solutionTitle);
        solution.innerHTML = h.solution[0].proposal;
        myModalBody.appendChild(solution);
    } else {
        var solutionTitle = document.createElement('h4');
        solutionTitle.innerHTML = '尚无医生给出的建议';
        myModalBody.appendChild(solutionTitle);
    }


    details.appendChild(button);
    row.appendChild(details);
    return row; //返回tr数据
}
