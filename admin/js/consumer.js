/**
 * Created by funinbook on 2016/11/28.
 */
$(function () {

//直接加载
    //new一个请求参数对象
    var model = new ParamsModel();
    //公司名称
    model.name=$('#companyName').val();
    //起始记录数
    model.start="0";
    //页大小
    model.limit="10";
    //直接加载
    funinbookSecurityAjax("/admin/getAllUserInfo", model, "POST", "true", adminConsumer);


    // 点击查询
    $('.first').click(function () {
        $('tr td').text("");
        //new一个请求参数对象
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        //直接加载
        funinbookSecurityAjax("/admin/getAllUserInfo", model, "POST", "true", adminConsumerClick);
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
        //new一个请求参数对象
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        //直接加载
        funinbookSecurityAjax("/admin/getAllUserInfo", model, "POST", "true", adminConsumerNextPage);
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
        //new一个请求参数对象
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start=(nowPage-1)*10+"";
        //页大小
        model.limit="10";
        //直接加载
        funinbookSecurityAjax("/admin/getAllUserInfo", model, "POST", "true", adminConsumerPrevPage);
        $('.start').text(nowPage);
    });
    //点击首页
    $('.home').click(function () {
        //new一个请求参数对象
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start="0";
        //页大小
        model.limit="10";
        //直接加载
        funinbookSecurityAjax("/admin/getAllUserInfo", model, "POST", "true", adminConsumerFirstPage);
        $('.start').text(1);
    });
    //点击尾页
    $('.end').click(function () {
        var allPage = $('.allPage').text();
        $('.start').text(allPage);
        //new一个请求参数对象
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start=(allPage-1)*10+"";
        //页大小
        model.limit="10";
        //直接加载
        funinbookSecurityAjax("/admin/getAllUserInfo", model, "POST", "true", adminConsumerLastPage);
        $('.start').text(allPage);
    });
    //下拉选择
    $('#pullDown').change(function () {
        var  jumpPage = $(this).val();
        $('.start').text(jumpPage);

        //new一个请求参数对象
        var model = new ParamsModel();
        //公司名称
        model.name=$('#companyName').val();
        //起始记录数
        model.start=(jumpPage-1)*10+"";
        //页大小
        model.limit="10";
        //直接加载
        funinbookSecurityAjax("/admin/getAllUserInfo", model, "POST", "true", adminConsumerPullDownPage);
    });
    //点击重置
    $('.reset').click(function () {
        $('.search input').val("");
    });
    //增加企业
$('.add').click(function () {
    $('.zhez').show();
    $('.firm').attr('style','display:block');
    $('.firm input').each(function () {
        $(this).not('.btn-c').val("");
    });
    $('.btn-c').click(function () {

        //new一个请求参数对象
        var model = new ParamsModelAdd();
        //公司ID
        model.userId=$('#firmId').val();
        //公司名称
        model.userName=$('#contact').val();
        //公司地址
        model.address=$('#address').val();
        //银行账户
        model.bankAccount= $('#card').val();
        //开户行
        model.bank=$('#bank').val();
        //联系人
        model.name=$('#firmName').val();
        //邮箱
        model.email=$('#email').val();
        //电话
        model.userTel=$('#tel').val();
        funinbookSecurityAjax("/admin/addUser", model, "POST", "true", adminConsumerAdd);
});
});
//修改企业
$('.change').click(function () {
    $('tr input').each(function () {
        if( $('tr input').is(":checked")){
            var checked = $('tr input:checked');
            //var tdVal = checked.parent();
            if(checked.length>1){
                alert('请选择其中一个');
                return false;
            }
            var arr = [];
            var goux =checked.parent().nextAll();
            arr.push(checked.val());
            $(goux).each(function (index) {
                arr.push($(goux[index]).text());
            });
            $('.zhez').show();
            $('.firm1').attr('style','display:block');
            var input = $('.firm1 input');
            $(arr).each(function (index) {
                input[index].value = arr[index];
            });
            $('.btn-c1').click(function () {
                var selected = $('.status option:selected').val();
                var status = null;
                if(selected=="可用"){
                    status = 1;
                }else if(selected=="不可用"){
                    status = 0;
                }
                //new一个请求参数对象
                var model = new ParamsModelChange();
                //公司ID
                model.userId=$('.firmId').val();
                //公司名称
                model.userName=$('.contact').val();
                //公司地址
                model.address=$('.address').val();
                //银行账户
                model.bankAccount= $('.card').val();
                //开户行
                model.bank=$('.bank').val();
                //联系人
                model.name=$('.firmName').val();
                //邮箱
                model.email=$('.email').val();
                //电话
                model.userTel=$('.tel').val();
                //账户状态
                model.status=status+"";
                funinbookSecurityAjax("/admin/updateUserInfo", model, "POST", "true", adminConsumerChange);
            });
            return false;
        }else {
            alert("请选择");
            return false;
        }
    })

});
//关闭弹出层
$('.close').click(function () {
    $('.zhez').hide();
    $('.firm').attr('style','display:none')
});
$('.close1').click(function () {
    $('.zhez').hide();
    $('.firm1').attr('style','display:none')
});
});
/**
 * AJAX回调函数,供初始化页面用
 * @param data 数据
 */
function  adminConsumer(data){
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
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').html('<input type="checkbox">');
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1) input').attr("value",data.msg[i].userId);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].name);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].address);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].bankAccount);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].bank);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].userName);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].email);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(8)').text(data.msg[i].userTel);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击查询用
 * @param data 数据
 */
function  adminConsumerClick(data){
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
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').html('<input type="checkbox">');
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1) input').attr("value",data.msg[i].userId);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].name);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].address);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].bankAccount);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].bank);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].userName);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].email);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(8)').text(data.msg[i].userTel);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供下一页用
 * @param data 数据
 */
function  adminConsumerNextPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').html('<input type="checkbox">');
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1) input').attr("value",data.msg[i].userId);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].name);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].address);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].bankAccount);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].bank);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].userName);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].email);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(8)').text(data.msg[i].userTel);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供上一页用
 * @param data 数据
 */
function  adminConsumerPrevPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').html('<input type="checkbox">');
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1) input').attr("value",data.msg[i].userId);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].name);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].address);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].bankAccount);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].bank);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].userName);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].email);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(8)').text(data.msg[i].userTel);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供首页用
 * @param data 数据
 */
function  adminConsumerFirstPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').html('<input type="checkbox">');
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1) input').attr("value",data.msg[i].userId);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].name);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].address);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].bankAccount);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].bank);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].userName);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].email);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(8)').text(data.msg[i].userTel);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供尾页用
 * @param data 数据
 */
function  adminConsumerLastPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').html('<input type="checkbox">');
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1) input').attr("value",data.msg[i].userId);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].name);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].address);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].bankAccount);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].bank);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].userName);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].email);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(8)').text(data.msg[i].userTel);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供尾页用
 * @param data 数据
 */
function  adminConsumerPullDownPage(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('tr td').text("");
        for(var i =0;i<data.msg.length;i++){
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1)').html('<input type="checkbox">');
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(1) input').attr("value",data.msg[i].userId);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(2)').text(data.msg[i].name);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(3)').text(data.msg[i].address);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(4)').text(data.msg[i].bankAccount);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(5)').text(data.msg[i].bank);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(6)').text(data.msg[i].userName);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(7)').text(data.msg[i].email);
            $('.table-q tr:nth-of-type('+(i+2)+') td:nth-of-type(8)').text(data.msg[i].userTel);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供增加企业使用
 * @param data 数据
 */
function  adminConsumerAdd(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.zhez').hide();
        window.location.reload();
    } else {
        //状态码对应信息不能为空
        if(success.length != 0){
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供修改企业使用
 * @param data 数据
 */
function  adminConsumerChange(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.firm1').hide();
        $('.zhez').hide();
        window.location.reload();
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
    //公司名称
    var name;
    //起始记录数
    var start;
    //页大小
    var limit;
}
function ParamsModelAdd() {
    //公司ID
    var userId;
    //公司名称
    var userName;
    //公司地址
    var address;
    //银行账户
    var bankAccount;
    //开户行
    var bank;
    //联系人
    var name;
    //邮箱
    var email;
    //联系电话
    var userTel;
}
function ParamsModelChange() {
    //公司ID
    var userId;
    //公司名称
    var userName;
    //公司地址
    var address;
    //银行账户
    var bankAccount;
    //开户行
    var bank;
    //联系人
    var name;
    //邮箱
    var email;
    //联系电话
    var userTel;
    //账户状态
    var status;
}