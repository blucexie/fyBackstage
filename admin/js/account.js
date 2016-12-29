/**
 * Created by funinbook on 2016/11/28.
 */
$(function () {
//判断sessionStorage有没有用户信息,有就从sessionStorage中读取
    if(getUserInfo() == null) {
        //发送ajax请求,查询账户信息
        funinbookSecurityAjax("/admin/account/getConsume", null, "POST", "true", executeAccountInfo);
    } else {
        var $span = $('.query li span');
        //获取用户信息
        var userInfo = getUserInfo();
        //填充页面数据
        $span.eq(0).text(userInfo.nowDayConsume);
        $span.eq(1).text(userInfo.yeserDayConsume);
        $span.eq(2).text(userInfo.nowMonthConsume);
    }
//发送ajax请求,查询余额信息
    funinbookSecurityAjax("/admin/account/getAllBalance", null, "POST", "true", executeUserBalance);
    /**
     * AJAX回调函数,账户信息用
     */
    function executeAccountInfo(data) {
        //获取状态码信息
        var success = this.success(data.success);
        //判断后台是否返回正确状态
        var $span = $('.query li span');
        if(success == true) {
            $span.eq(0).text(data.msg.nowDayConsume);
            $span.eq(1).text(data.msg.yeserDayConsume);
            $span.eq(2).text(data.msg.nowMonthConsume);
            //清除用户数据
            this.clearUserInfo();
            //向session中保存数据
            this.setUserInfo(formatJson(data.msg));
        } else {
            //状态码对应信息不能为空
            if(success.length != 0) {
                alert(success);
            }
        }
    }

    /**
     * AJAX回调函数,用户余额使用
     */
    function executeUserBalance(data) {
        //获取状态码信息
        var success = this.success(data.success);
        //判断后台是否返回正确状态
        var $span = $('.query li span');
        if(success == true) {
            $span.eq(3).text(data.msg);
        } else {
            //状态码对应信息不能为空
            if(success.length != 0) {
                alert(success);
            }
        }
    }

    //直接加载
    var model = new ParamsModel();
    //公司名称
    model.name=$('#companyName').val();
    //起始记录数
    model.start="0";
    //页大小
    model.limit="6";
    funinbookSecurityAjax("/admin/account/getAllUserBalance", model, "POST", "true", adminAccount);

    // 点击查询
    $('.port').click(function () {
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start="0";
        //页大小
        model.limit="6";
        funinbookSecurityAjax("/admin/account/getAllUserBalance", model, "POST", "true", adminAccountClick);
    });

    //点击下一页
    $('.next').click(function () {
        var nowPage=$('.start').text();
        var allPage = $('.allPage').text();
        if(nowPage===allPage){
            return false;
        }else{
            nowPage++;
        }
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start=(nowPage-1)*6+"";
        //页大小
        model.limit="6";
        funinbookSecurityAjax("/admin/account/getAllUserBalance", model, "POST", "true", adminAccountNextPage);
        $('.start').text(nowPage);
    });
    //点击上一页
    $('.prev').click(function () {
        var nowPage=$('.start').text();
        if(nowPage<=1){
            nowPage=1;
        }else{
            nowPage--;
        }
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();

        //起始记录数
        model.start=(nowPage-1)*6+"";
        //页大小
        model.limit="6";
        funinbookSecurityAjax("/admin/account/getAllUserBalance", model, "POST", "true", adminAccountPrevPage);
        $('.start').text(nowPage);
    });

    //点击首页
    $('.home').click(function () {
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start="0";
        //页大小
        model.limit="6";
        funinbookSecurityAjax("/admin/account/getAllUserBalance", model, "POST", "true", adminAccountFirstPage);
        $('.start').text(1);
    });
    //点击尾页
    $('.end').click(function () {
        var allPage = $('.allPage').text();
        $('.start').text(allPage);
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start=(allPage-1)*6+"";
        //页大小
        model.limit="6";
        funinbookSecurityAjax("/admin/account/getAllUserBalance", model, "POST", "true", adminAccountLastPage);
        $('.start').text(allPage);
    });

    //下拉选择
    $('#pullDown').change(function () {
        var  jumpPage = $(this).val();
        $('.start').text(jumpPage);
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start=(jumpPage-1)*6+"";
        //页大小
        model.limit="6";
        funinbookSecurityAjax("/admin/account/getAllUserBalance", model, "POST", "true", adminAccountPullDownPage);
    });
    $('.reset').click(function () {
        $('.search input').val("")
    });
    //上次登录时间
    funinbookSecurityAjax("/admin/getUserInfo", null, "POST", "true", adminAccountTime);
});

/**
 * AJAX回调函数,上次登录时间使用
 * @param data 数据
 */
function  adminAccountTime(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        var time =data.msg.loginTime;
        time = changeTime(time);
        function changeTime(str) {
            var year = str.slice(0, 4);
            var month = str.slice(4, 6);
            var day = str.slice(6, 8);
            var time = str.slice(8, 10);
            var minute = str.slice(10, 12);
            var newTime = year + '.' + month + '.' + day + ' ' + time + ':' + minute;
            return newTime;
        }
        $('.time span').text(time);
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
function  adminAccount(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.allPage').text(Math.ceil(data.totalRecord/6));
        $('.all').text(data.totalRecord);
        if(data.totalRecord==0){
            $('.start').text(0);
        }
        for(var j =0;j<data.totalRecord/6;j++){
            $(' <option>'+(j+1)+'</option>').appendTo('select');
        }
        for(var i =0;i<data.msg.length;i++){
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].balance);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].threshold);
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
function  adminAccountClick(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        $('#pullDown').html("");
        $('.start').text(1);
        $('.allPage').text(Math.ceil(data.totalRecord/6));
        $('.all').text(data.totalRecord);
        for(var j =0;j<data.totalRecord/6;j++){
            $(' <option>'+(j+1)+'</option>').appendTo('select');
        }
        for(var i =0;i<data.msg.length;i++){
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].balance);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].threshold);
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
function  adminAccountNextPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].balance);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].threshold);
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
function  adminAccountPrevPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].balance);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].threshold);
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
function  adminAccountFirstPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].balance);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].threshold);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供尾页用
 * @param data 数据
 */
function  adminAccountLastPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].balance);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].threshold);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供尾页用
 * @param data 数据
 */
function  adminAccountPullDownPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').text(data.msg[i].name);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].balance);
            $('.table-z tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].threshold);
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
    //公司名称
    var name;
    //起始记录数
    var start;
    //页大小
    var limit;
}
