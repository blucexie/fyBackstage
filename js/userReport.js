/**
 * Created by funinbook on 2016/11/23.
 */
$(function () {

    /* 查询报表*/
    //获取接口名称
    funinbookSecurityAjax("/user/interface/getUserInterface", null, "POST", "true", executeInterfaceName);

    //直接加载
    var selected = $('.interfaceName option:selected');
    var interfaceName =selected.val();
    //new一个请求参数对象
    var model = new ParamsModel();
    //起始时间
    model.startTime=$('#portStartTime').val().replace(/-/g,"");
    //结束时间
    model.endTime=$('#portEndTime').val().replace(/-/g,"");
    //接口ID
    model.interfaceId =selected.attr('id');
    //起始记录数
    model.start="0";
    //页大小
    model.limit="10";
    //初始化加载页面数据
    funinbookSecurityAjax("/user/report/getHourInterfaceReport", model, "POST", "true", getReport);

    // 点击查询
    $('.port').click(function () {
        var selected = $('.interfaceName option:selected');
        var interfaceName =selected.val();
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //接口ID
        model.interfaceId =selected.attr('id');
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        //点击查询
        funinbookSecurityAjax("/user/report/getHourInterfaceReport", model, "POST", "true", getReportClick);
    });
    //点击下一页
    $('.next').click(function () {
        var $start =$('.start');
        var nowPage=$start.text();
        var allPage = $('.allPage').text();
        if(nowPage===allPage){
            return false;
        }else{
            nowPage++;
        }
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //接口ID
        model.interfaceId = $('.interfaceName option:selected').attr('id');
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getHourInterfaceReport", model, "POST", "true", getReportNextPage);
        $start.text(nowPage);
    });
    //点击上一页
    $('.prev').click(function () {
        var $start =$('.start');
        var nowPage=$start.text();
        if(nowPage<=1){
            nowPage=1;
        }else{
            nowPage--;
        }
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //接口ID
        model.interfaceId = $('.interfaceName option:selected').attr('id');
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getHourInterfaceReport", model, "POST", "true", getReportPrevPage);
        $start.text(nowPage);
    });

    //点击首页
    $('.home').click(function () {
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //接口ID
        model.interfaceId =$('.interfaceName option:selected').attr('id');
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getHourInterfaceReport", model, "POST", "true", getReportFirstPage);
        $('.start').text(1);
    });
    //点击尾页
    $('.end').click(function () {
        var allPage = $('.allPage').text();
        var $start =$('.start');
        $start.text(allPage);
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //接口ID
        model.interfaceId = $('.interfaceName option:selected').attr('id');
        //起始记录数
        model.start=(allPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getHourInterfaceReport", model, "POST", "true", getReportLastPage);
        $start.text(allPage);
    });

//下拉选择
    $('#pullDown').change(function () {
        var  jumpPage = $(this).val();
        $('.start').text(jumpPage);
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //接口ID
        model.interfaceId = $('.interfaceName option:selected').attr('id');
        //起始记录数
        model.start=(jumpPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getHourInterfaceReport", model, "POST", "true", getReportPullDownPage);
    });
    $('.reset').click(function () {
        $('.search input').val("");
    });
});
/**
 * AJAX回调函数,获取接口名称
 */
function executeInterfaceName(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('<option>无接口</option>').appendTo('.interfaceName');
        for(var j =0;j<data.msg.length;j++){
            $('<option id = '+data.msg[j].interfaceId+'>'+data.msg[j].interfaceName+'</option>').appendTo('.interfaceName');
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供初始化页面用
 * @param data 数据
 */
function  getReport(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if (success == true) {
        $('.allPage').text(Math.ceil(data.totalRecord / 10));
        $('.all').text(data.totalRecord);
        for (var j = 0; j < data.totalRecord / 10; j++) {
            $(' <option>' + (j + 1) + '</option>').appendTo('#pullDown');
        }
        for (var i = 0; i < data.msg.length; i++) {
            $('.table-f tr:nth-of-type(' + (i + 2) + ') td:nth-of-type(1)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type(' + (i + 2) + ') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type(' + (i + 2) + ') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type(' + (i + 2) + ') td:nth-of-type(4)').text(data.msg[i].noBillingNum);
            $('.table-f tr:nth-of-type(' + (i + 2) + ') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    } else {
            //状态码对应信息不能为空
            if (success.length != 0) {
                alert(success);
            }
        }
}
/**
 * AJAX回调函数,供点击查询用
 * @param data 数据
 */
function  getReportClick(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if (success == true) {
        $('tr td').text("");
        $('#pullDown').html("");
        $('.allPage').text(Math.ceil(data.totalRecord/10));
        $('.all').text(data.totalRecord);
        $('.start').text(1);
        for(var j =0;j<data.totalRecord/10;j++){
            $(' <option>'+(j+1)+'</option>').appendTo('#pullDown');
        }
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].noBillingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    }else {
        //状态码对应信息不能为空
        if (success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供点击下一页用
 * @param data 数据
 */
function  getReportNextPage(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if (success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].noBillingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    }else {
        //状态码对应信息不能为空
        if (success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供点击上一页用
 * @param data 数据
 */
function  getReportPrevPage(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if (success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].noBillingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    }else {
        //状态码对应信息不能为空
        if (success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供点击首页用
 * @param data 数据
 */
function  getReportFirstPage(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if (success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].noBillingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    }else {
        //状态码对应信息不能为空
        if (success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击尾页用
 * @param data 数据
 */
function  getReportLastPage(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if (success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].noBillingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    }else {
        //状态码对应信息不能为空
        if (success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供点击下拉页用
 * @param data 数据
 */
function  getReportPullDownPage(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if (success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].noBillingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    }else {
        //状态码对应信息不能为空
        if (success.length != 0) {
            alert(success);
        }
    }
}
/**
 * 请求参数对象
 */
function ParamsModel() {
    //起始时间
    var startTime;
    //结束时间
    var endTime;
    //接口ID
    var interfaceId;
    //起始记录数
    var start;
    //页大小
    var limit;
}