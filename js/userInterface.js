/**
 * Created by funinbook on 2016/11/23.
 */
$(function () {
    /* 接口记录*/
    //直接加载
    var model = new ParamsModel();
    //起始时间
    model.startTime=$('#portStartTime').val().replace(/-/g,"");
    //结束时间
    model.endTime=$('#portEndTime').val().replace(/-/g,"");
    //起始记录数
    model.start="0";
    //页大小
    model.limit="10";
    //初始化加载页面数据
    funinbookSecurityAjax("/user/report/getDayInterfaceReport", model, "POST", "true", getInterface);

    // 点击查询
    $('.port').click(function () {
        $('#loading').show();
        $('.zhez').show();
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //起始记录数
        model.start = "0";
        //页大小
        model.limit = "10";
        //初始化加载页面数据
        funinbookSecurityAjax("/user/report/getDayInterfaceReport", model, "POST", "true", getInterfaceClick);
    });

    //点击下一页
    $('.next').click(function () {
        var $loading = $('#loading');
        var $zhez = $('.zhez');
        $loading.show();
        $zhez.show();
        var $start =$('.start');
        var nowPage=$start.text();
        var allPage = $('.allPage').text();
        if(nowPage===allPage){
            $loading.hide();
            $zhez.hide();
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
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        //下一页
        funinbookSecurityAjax("/user/report/getDayInterfaceReport", model, "POST", "true", getInterfaceNextPage);
        $start.text(nowPage);
    });
//点击上一页
    $('.prev').click(function () {
        var $loading = $('#loading');
        var $zhez = $('.zhez');
        $loading.show();
        $zhez.show();
        var $start =$('.start');
        var nowPage= $start.text();
        if(nowPage<=1){
            nowPage=1;
            $loading.hide();
            $zhez.hide();
        }else{
            nowPage--;
        }
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getDayInterfaceReport", model, "POST", "true", getInterfacePrevPage);
        $start.text(nowPage);
    });
//点击首页
    $('.home').click(function () {
        $('#loading').show();
        $('.zhez').show();
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getDayInterfaceReport", model, "POST", "true", getInterfaceFirstPage);
        $('.start').text(1);
    });
//点击尾页
    $('.end').click(function () {
        $('#loading').show();
        $('.zhez').show();
        var $start =$('.start');
        var allPage = $('.allPage').text();
        $start.text(allPage);
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //起始记录数
        model.start=(allPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getDayInterfaceReport", model, "POST", "true", getInterfaceLastPage);
        $start.text(allPage);
    });
//下拉选择
    $('#pullDown').change(function () {
        $('#loading').show();
        $('.zhez').show();
        var  jumpPage = $(this).val();
        $('.start').text(jumpPage);
        //new一个请求参数对象
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //起始记录数
        model.start=(jumpPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/user/report/getDayInterfaceReport", model, "POST", "true", getInterfacePullDownPage);
    });
    $('.reset').click(function () {
        $('.search input').val("")
    });
    });

/**
 * AJAX回调函数,供初始化页面用
 * @param data 数据
 */
function  getInterface(data){
    //获取状态码信息
    var success = this.success(data.success);

    //判断后台是否返回正确状态
    if(success == true) {
        $('.allPage').text(Math.ceil(data.totalRecord/10));
        $('.all').text(data.totalRecord);
        $('.start').text(1);
        for(var j =0;j<data.totalRecord/10;j++){
            $(' <option>'+(j+1)+'</option>').appendTo('select');
        }
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingFee);
        }
        $('#loading').hide();
        $('.zhez').hide();
    } else {
        //状态码对应信息不能为空
        if(success!== 0) {
            return success;
        }
    }
}
/**
 * AJAX回调函数,供按条件查询用
 * @param data 数据
 */
function  getInterfaceClick(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        $('#pullDown').html("");
        $('.allPage').text(Math.ceil(data.totalRecord/10));
        $('.all').text(data.totalRecord);
        $('.start').text(1);
        for(var j =0;j<data.totalRecord/10;j++){
            $(' <option>'+(j+1)+'</option>').appendTo('select');
        }
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingFee);
        }
        $loading.hide();
        $zhez.hide();
    } else {
        //状态码对应信息不能为空
        if(success !== 0) {
            $loading.hide();
            $zhez.hide();
            return success;
        }
    }
}
/**
 * AJAX回调函数,供下一页使用
 * @param data 数据
 */
function  getInterfaceNextPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingFee);
        }
        $loading.hide();
        $zhez.hide();
    } else {
        //状态码对应信息不能为空
        if(success!== 0) {
            $loading.hide();
            $zhez.hide();
            return success;
        }
    }
}
/**
 * AJAX回调函数,供上一页使用
 * @param data 数据
 */
function  getInterfacePrevPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingFee);
        }
        $loading.hide();
        $zhez.hide();
    } else {
        //状态码对应信息不能为空
        if(success!== 0) {
            $loading.hide();
            $zhez.hide();
            return success;
        }
    }
}
/**
 * AJAX回调函数,供点击首页使用
 * @param data 数据
 */
function  getInterfaceFirstPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingFee);
        }
        $loading.hide();
        $zhez.hide();
    } else {
        //状态码对应信息不能为空
        if(success!== 0) {
            $loading.hide();
            $zhez.hide();
            return success;
        }
    }
}
/**
 * AJAX回调函数,供点击尾页使用
 * @param data 数据
 */
function  getInterfaceLastPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingFee);
        }
        $loading.hide();
        $zhez.hide();
    } else {
        //状态码对应信息不能为空
        if(success!== 0) {
            $loading.hide();
            $zhez.hide();
            return success;
        }
    }
}
/**
 * AJAX回调函数,供点击下拉页用
 * @param data 数据
 */
function  getInterfacePullDownPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].interfaceName);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].billingNum);
            $('.table-j tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].billingFee);
        }
        $loading.hide();
        $zhez.hide();
    } else {
        //状态码对应信息不能为空
        if(success!== 0) {
            $loading.hide();
            $zhez.hide();
            return success;
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
    //起始记录数
    var start;
    //页大小
    var limit;
}
