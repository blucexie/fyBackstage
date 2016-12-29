/**
 * Created by funinbook on 2016/11/29.
 */
$(function () {

//获取接口名称
    funinbookSecurityAjax("/admin/interface/getAllInterface", null, "POST", "true", adminInterfaceName);

    //直接加载
    var selected = $('.interfaceName option:selected');
    var interfaceName =selected.val();
    var interfaceId = selected.attr('id');
    //new一个请求参数对象
    var model = new ParamsModel();
    //起始时间
    model.startTime=$('#portStartTime').val().replace(/-/g,"");
    //结束时间
    model.endTime=$('#portEndTime').val().replace(/-/g,"");
    //公司名称
    model.name=$('#companyName').val();
    //接口ID
    model.interfaceId=interfaceId;
    //起始记录数
    model.start="0";
    //页大小
    model.limit="10";
    funinbookSecurityAjax("/admin/report/getHourInterfaceReport", model, "POST", "true", adminReport);

// 点击查询
    $('.port').click(function () {
        $('tr td').text("");
        var selected = $('.interfaceName option:selected');
        var interfaceName =selected.val();
        var interfaceId = selected.attr('id');
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.interfaceId=interfaceId;
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getHourInterfaceReport", model, "POST", "true", adminReportClick);
    });

    //点击下一页
    $('.next').click(function () {
        var nowPage=$('.start').text();
        var allPage = $('.allPage').text();
        var interfaceId = $('.interfaceName option:selected').attr('id');
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
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.interfaceId=interfaceId;
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getHourInterfaceReport", model, "POST", "true", adminReportNextPage);
        $('.start').text(nowPage);
    });
    //点击上一页
    $('.prev').click(function () {
        var nowPage=$('.start').text();
        var interfaceId = $('.interfaceName option:selected').attr('id');
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
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.interfaceId=interfaceId;
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getHourInterfaceReport", model, "POST", "true", adminReportPrevPage);
        $('.start').text(nowPage);
    });
    //点击首页
    $('.home').click(function () {
        var interfaceId = $('.interfaceName option:selected').attr('id');

        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.interfaceId=interfaceId;
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getHourInterfaceReport", model, "POST", "true", adminReportFirstPage);
        $('.start').text(1);
    });
    //点击尾页
    $('.end').click(function () {

        var allPage = $('.allPage').text();
        var interfaceId = $('.interfaceName option:selected').attr('id');

        $('.start').text(allPage);
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.interfaceId=interfaceId;
        //起始记录数
        model.start=(allPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getHourInterfaceReport", model, "POST", "true", adminReportLastPage);
        $('.start').text(allPage);
    });
    //下拉选择
    $('#pullDown').change(function () {
        var  jumpPage = $(this).val();
        var interfaceId = $('.interfaceName option:selected').attr('id');
        $('.start').text(jumpPage);

        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.interfaceId=interfaceId;
        //起始记录数
        model.start=(jumpPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getHourInterfaceReport", model, "POST", "true", adminReportPullDownPage);
    });
    $('.reset').click(function () {
        $('.search input').val("");
    });
});
/**
 * AJAX回调函数,获取接口名称
 * @param data 数据
 */
function  adminInterfaceName(data){
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
function  adminReport(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.allPage').text(Math.ceil(data.totalRecord/10));
        $('.all').text(data.totalRecord);
        for(var j =0;j<data.totalRecord/10;j++){
            $(' <option>'+(j+1)+'</option>').appendTo('#pullDown');
        }
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].noBillingFee);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击查询用
 * @param data 数据
 */
function  adminReportClick(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        $('#pullDown').html("");
        $('.allPage').text(Math.ceil(data.totalRecord/10));
        $('.all').text(data.totalRecord);
        $('.start').text(1);
        for(var j =0;j<data.totalRecord/10;j++){
            $(' <option>'+(j+1)+'</option>').appendTo('#pullDown');
        }
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].noBillingFee);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供下一页用
 * @param data 数据
 */
function  adminReportNextPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].noBillingFee);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供上一页用
 * @param data 数据
 */
function  adminReportPrevPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].noBillingFee);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供首页用
 * @param data 数据
 */
function  adminReportFirstPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].noBillingFee);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}


/**
 * AJAX回调函数,供下拉页用
 * @param data 数据
 */
function  adminReportPullDownPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].interfaceName);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingNum);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].noBillingFee);
            $('.table-f tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
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
    //公司名称
    var name;
    //接口ID
    var interfaceId;
    //起始记录数
    var start;
    //页大小
    var limit;
}
