/**
 * Created by funinbook on 2016/11/29.
 */
$(function () {

    //获取接口名称
    funinbookSecurityAjax("/admin/interface/getAllInterface", null, "POST", "true", adminInterfaceName);
/*----------------*/
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
    //直接加载
    funinbookSecurityAjax("/admin/report/getDayInterfaceReport", model, "POST", "true", adminInterface);
    /*------------------*/

    //下载报表
    $('#downReport').click(function(){
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
    	//发送post请求
    	post("/admin/excle/downInterfaceReport",model);
    })
    
    
        //下载报表
    $('#downReportInfo').click(function(){
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
    	//发送post请求
    	post("/admin/excle/downInterfaceInfoReport",model);
    })
    
    
    
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
        //直接加载
        funinbookSecurityAjax("/admin/report/getDayInterfaceReport", model, "POST", "true", adminInterfaceClick);
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
        //直接加载
        funinbookSecurityAjax("/admin/report/getDayInterfaceReport", model, "POST", "true", adminInterfaceNextPage);
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
        //直接加载
        funinbookSecurityAjax("/admin/report/getDayInterfaceReport", model, "POST", "true", adminInterfacePrevPage);
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
        //直接加载
        funinbookSecurityAjax("/admin/report/getDayInterfaceReport", model, "POST", "true", adminInterfaceFirstPage);
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
        //直接加载
        funinbookSecurityAjax("/admin/report/getDayInterfaceReport", model, "POST", "true", adminInterfaceLastPage);
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
        //直接加载
        funinbookSecurityAjax("/admin/report/getDayInterfaceReport", model, "POST", "true", adminInterfacePullDownPage);
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
function  adminInterface(data){
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
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].num);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
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
function  adminInterfaceClick(data){
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
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].num);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击下一页用
 * @param data 数据
 */
function  adminInterfaceNextPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].num);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击下一页用
 * @param data 数据
 */
function  adminInterfacePrevPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].num);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击首页用
 * @param data 数据
 */
function  adminInterfaceFirstPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].num);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击尾页用
 * @param data 数据
 */
function  adminInterfaceLastPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].num);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击下拉页用
 * @param data 数据
 */
function  adminInterfacePullDownPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].num);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].billingFee);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
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


