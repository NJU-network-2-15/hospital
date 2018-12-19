var ajaxURL = "/API/";
var requestDoctorInfo = "requestDoctorInfoByID";
var requestAllCaseDoctor = "requestAllCaseDoctorSovled";
var doctorInfo;
var doctorCase;

var doctor_id = document.getElementById("session.doctorID").innerHTML;
var doctor_name = document.getElementById("session.doctorName").innerHTML;
var doctor_account = document.getElementById("session.account").innerHTML;
var doctor_password = document.getElementById("session.password").innerHTML;
var doctor_level = document.getElementById("session.doctorLevel").innerHTML;
var caseType = document.getElementById("session.department").innerHTML;

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
    data: {'doctorID': doctor_id},//<------------------换成科室
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
    if (h.solution.length == 0) {                                             // <-------------此处将判断是否完成的状态的判断条件 改成不再是根据lastTime 而是根据是否有soltion  下同
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
    if (h.solution.length == 0) {                                                    // <-------------此处已修改   同上
        lastTime.innerHTML = "未完成";
    } else {
        /**此处修改*/
        /*得到最近回复时间*/
        var lastResponse = new Date(Date.parse(h.solution[0].responseTime));
        for (j = 1; j < h.solution.length; j++) {
            if (lastResponse < h.solution[j].responseTime) {
                lastResponse = h.solution[j].responseTime;
            }
        }
        lastTime.innerHTML = new Date(lastResponse).toLocaleString();
        /**此处修改*/
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
    if (h.solution.length == 0) {                               // <-------------此处已修改   同上
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

    if (typeof (h.solution.length) != "undefined"){
        if (h.solution.length > 0) {
            for (var i = 0;i<h.solution.length;i++){
                var solution = document.createElement('div');
                var solutionTitle = document.createElement('h4');
                solutionTitle.innerHTML = '医生' + h.solution[i].doctorName + '给出的建议' + '      时间：' + h.solution[i].responseTime;
                myModalBody.appendChild(solutionTitle);
                solution.innerHTML = h.solution[i].proposal;
                myModalBody.appendChild(solution);
            }
        }
        else {
            var solutionTitle = document.createElement('h4');
            solutionTitle.innerHTML = '尚无医生给出的建议';
            myModalBody.appendChild(solutionTitle);
        }
    } else {
        var solutionTitle = document.createElement('h4');
        solutionTitle.innerHTML = '尚无医生给出的建议';
        myModalBody.appendChild(solutionTitle);
    }


    /*此处新增医生提交建议 开始*/
    var proposal = document.createElement('textarea');
    proposal.setAttribute('class', 'form-control');
    proposal.setAttribute('rows', '4');
    proposal.setAttribute('id', 'textarea' + i.toString());
    myModalBody.appendChild(proposal);
    var sumbit = document.createElement('Button');
    sumbit.setAttribute('class', 'btn btn-primary');
    sumbit.innerHTML = "提交我的建议";
    sumbit.setAttribute('id', 'sumbit' + i.toString());
    myModalBody.appendChild(sumbit);
    $(function () {
        $("#sumbit" + i.toString()).click(function () {
            sumbitProposal(h.caseID, $("#textarea" + i.toString()).val());
        });
    })
    /*此处新增医生提交建议 结尾*/
    details.appendChild(button);
    row.appendChild(details);
    return row; //返回tr数据
}


function sumbitProposal(caseID, value) {
    $.ajax({
        type: 'GET',
        async: false,//设置成同步
        url: ajaxURL + "updateCaseDoctor",
        dataType: "html",
        data: {
            'caseID': caseID,
            'account': doctor_account,   //《------------换成登录的医生account
            'password': doctor_password,//《------------换成登录的医生密码
            'doctorID': doctor_id,//《------------换成登录的医生的id
            'doctorName': doctor_name,//《------------换成登录的医生名字
            'doctorLevel': doctor_level,//《------------换成登录的医生登记
            'proposal': value,
        },
        success: function (result) {
            alert('提交成功！');
            window.location.href = '/doctorInfo';
        },
        error: function () {
            alert('提交失败！');
            window.location.href = '/doctorInfo';
        }
    });
}
