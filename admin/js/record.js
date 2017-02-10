/**
 * Created by funinbook on 2016/11/29.
 */
$(function () {

    //直接加载

    var selected = $('.costWay option:selected').val();
    //new一个请求参数对象
    var model = new ParamsModel();
    //起始时间
    model.startTime=$('#portStartTime').val().replace(/-/g,"");
    //结束时间
    model.endTime=$('#portEndTime').val().replace(/-/g,"");
    //公司名称
    model.name=$('#companyName').val();
    //接口ID
    model.channel=null;
    //起始记录数
    model.start="0";
    //页大小
    model.limit="10";
    funinbookSecurityAjax("/admin/report/getRechargeRecord", model, "POST", "true", adminRecord);
// 点击查询
    $('.port').click(function () {
        $('#loading').show();
        $('.zhez').show();
        $('tr td').text("");
        var selected = $('.costWay option:selected').val();
        var channel=null;
        if(selected=="支付宝"){
            channel="1";
        }else if(selected=="管理员"){
            channel="0";
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
        model.channel=channel;
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getRechargeRecord", model, "POST", "true", adminRecordClick);
    });
    //点击下一页
    $('.next').click(function () {
        var $loading = $('#loading');
        var $zhez = $('.zhez');
        $loading.show();
        $zhez.show();
        var selected = $('.costWay option:selected').val();
        var channel=null;
        if(selected=="支付宝"){
            channel="1";
        }else if(selected=="管理员"){
            channel="0";
        }
        var nowPage=$('.start').text();
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
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.channel=channel;
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getRechargeRecord", model, "POST", "true", adminRecordNextPage);
        $('.start').text(nowPage);
    });
    //点击上一页
    $('.prev').click(function () {
        var $loading = $('#loading');
        var $zhez = $('.zhez');
        $loading.show();
        $zhez.show();
        var selected = $('.costWay option:selected').val();
        var channel=null;
        if(selected=="支付宝"){
            channel="1";
        }else if(selected=="管理员"){
            channel="0";
        }
        var nowPage=$('.start').text();
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
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.channel=channel;
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getRechargeRecord", model, "POST", "true", adminRecordPrevPage);
        $('.start').text(nowPage);
    });
    //点击首页
    $('.home').click(function () {
        $('#loading').show();
        $('.zhez').show();
        var selected = $('.costWay option:selected').val();
        var channel=null;
        if(selected=="支付宝"){
            channel="1";
        }else if(selected=="管理员"){
            channel="0";
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
        model.channel=channel;
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getRechargeRecord", model, "POST", "true", adminRecordFirstPage);
        $('.start').text(1);
    });
    //点击尾页
    $('.end').click(function () {
        $('#loading').show();
        $('.zhez').show();
        var selected = $('.costWay option:selected').val();
        var channel=null;
        if(selected=="支付宝"){
            channel="1";
        }else if(selected=="管理员"){
            channel="0";
        }
        var allPage = $('.allPage').text();
        $('.start').text(allPage);

        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.channel=channel;
        //起始记录数
        model.start=(allPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getRechargeRecord", model, "POST", "true", adminRecordLastPage);
        $('.start').text(allPage);
    });
    //下拉选择
    $('#pullDown').change(function () {
        $('#loading').show();
        $('.zhez').show();
        var selected = $('.costWay option:selected').val();
        var channel=null;
        if(selected=="支付宝"){
            channel="1";
        }else if(selected=="管理员"){
            channel="0";
        }
        var  jumpPage = $(this).val();
        $('.start').text(jumpPage);
        var model = new ParamsModel();
        //起始时间
        model.startTime=$('#portStartTime').val().replace(/-/g,"");
        //结束时间
        model.endTime=$('#portEndTime').val().replace(/-/g,"");
        //公司名称
        model.name=$('#companyName').val();
        //接口ID
        model.channel=channel;
        //起始记录数
        model.start=(jumpPage-1)*10+"";
        //页大小
        model.limit="10";
        funinbookSecurityAjax("/admin/report/getRechargeRecord", model, "POST", "true", adminRecordPullDownPage);
    });
    $('.reset').click(function () {
        $('.search input').val("");
    });
});

/**
 * AJAX回调函数,供初始化页面用
 * @param data 数据
 */
function  adminRecord(data){
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
            var num1 = data.msg[i].channel;
            var num2 = data.msg[i].status;
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].addfee);
            if(num1==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("支付宝");
            }else if(num1==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("管理员");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].addUserName);
            if(num2==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值失败");
            }else if(num2==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值成功");
            }else if(num2==2){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("等待支付商通知");
            }else if(num2==3){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("系统异常");
            }else if(num2==4){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值金额不匹配");
            }else if(num2==5){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("未在本平台找到相应订单");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].remark);
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
 * AJAX回调函数,供点击查询用
 * @param data 数据
 */
function  adminRecordClick(data){
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
            $(' <option>'+(j+1)+'</option>').appendTo('#pullDown');
        }
        for(var i =0;i<data.msg.length;i++){
            var num1 = data.msg[i].channel;
            var num2 = data.msg[i].status;
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].addfee);
            if(num1==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("支付宝");
            }else if(num1==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("管理员");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].addUserName);
            if(num2==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值失败");
            }else if(num2==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值成功");
            }else if(num2==2){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("等待支付商通知");
            }else if(num2==3){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("系统异常");
            }else if(num2==4){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值金额不匹配");
            }else if(num2==5){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("未在本平台找到相应订单");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].remark);
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
 * AJAX回调函数,供点击下一页用
 * @param data 数据
 */
function  adminRecordNextPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            var num1 = data.msg[i].channel;
            var num2 = data.msg[i].status;
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].addfee);
            if(num1==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("支付宝");
            }else if(num1==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("管理员");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].addUserName);
            if(num2==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值失败");
            }else if(num2==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值成功");
            }else if(num2==2){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("等待支付商通知");
            }else if(num2==3){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("系统异常");
            }else if(num2==4){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值金额不匹配");
            }else if(num2==5){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("未在本平台找到相应订单");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].remark);
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
 * AJAX回调函数,供点击上一页用
 * @param data 数据
 */
function  adminRecordPrevPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            var num1 = data.msg[i].channel;
            var num2 = data.msg[i].status;
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].addfee);
            if(num1==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("支付宝");
            }else if(num1==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("管理员");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].addUserName);
            if(num2==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值失败");
            }else if(num2==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值成功");
            }else if(num2==2){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("等待支付商通知");
            }else if(num2==3){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("系统异常");
            }else if(num2==4){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值金额不匹配");
            }else if(num2==5){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("未在本平台找到相应订单");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].remark);
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
 * AJAX回调函数,供点击首页用
 * @param data 数据
 */
function  adminRecordFirstPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            var num1 = data.msg[i].channel;
            var num2 = data.msg[i].status;
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].addfee);
            if(num1==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("支付宝");
            }else if(num1==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("管理员");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].addUserName);
            if(num2==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值失败");
            }else if(num2==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值成功");
            }else if(num2==2){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("等待支付商通知");
            }else if(num2==3){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("系统异常");
            }else if(num2==4){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值金额不匹配");
            }else if(num2==5){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("未在本平台找到相应订单");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].remark);
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
 * AJAX回调函数,供点击尾页用
 * @param data 数据
 */
function  adminRecordLastPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            var num1 = data.msg[i].channel;
            var num2 = data.msg[i].status;
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].addfee);
            if(num1==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("支付宝");
            }else if(num1==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("管理员");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].addUserName);
            if(num2==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值失败");
            }else if(num2==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值成功");
            }else if(num2==2){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("等待支付商通知");
            }else if(num2==3){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("系统异常");
            }else if(num2==4){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值金额不匹配");
            }else if(num2==5){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("未在本平台找到相应订单");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].remark);
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
function  adminRecordPullDownPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    var $loading = $('#loading');
    var $zhez = $('.zhez');
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            var num1 = data.msg[i].channel;
            var num2 = data.msg[i].status;
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].time);
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].addfee);
            if(num1==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("支付宝");
            }else if(num1==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text("管理员");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].addUserName);
            if(num2==0){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值失败");
            }else if(num2==1){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值成功");
            }else if(num2==2){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("等待支付商通知");
            }else if(num2==3){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("系统异常");
            }else if(num2==4){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("充值金额不匹配");
            }else if(num2==5){
                $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text("未在本平台找到相应订单");
            }
            $('.table-c tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].remark);
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
    //公司名称
    var name;
    //充值方式
    var channel;
    //起始记录数
    var start;
    //页大小
    var limit;
}