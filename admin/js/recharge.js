/**
 * Created by funinbook on 2016/11/30.
 */
$(function () {

    //账户下拉列表
    funinbookSecurityAjax("/admin/getAllUserList", null, "POST", "true", adminUserList);


    //查询账户余额
    $('.client').change(function () {
        var selected = $('.client option:selected');
        var checked = selected.val();
        var userId = selected.attr('id');
        if(checked=="请选择"){
            return false;
        }
        var model = new ParamsModel();
        //账户ID
        model.userId = userId;
    funinbookSecurityAjax("/admin/account/getBalance", model, "POST", "true", adminUserBalance);

    });
    //点击充值
    $('.btn-2').click(function () {
        var selected = $('.client option:selected');
        var userId = selected.attr('id');
        var model = new ParamsModelCharge();
        //账户ID
        model.userId = userId;
        //充值金额
        model.fee = $('.shuru').val();
        //备注
        model.remark = $('textarea').val();
        funinbookSecurityAjax("/admin/account/addBalance", model, "POST", "true", adminUserCharge);
    })
});

/**
 * AJAX回调函数,供下拉列表用
 * @param data 数据
 */
function  adminUserList(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('<option>请选择</option>').appendTo('.client');
        for(var j =0;j<data.msg.length;j++){
            $(' <option id = '+data.msg[j].userId+'>'+data.msg[j].name+'</option>').appendTo('.client');
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供查询账户余额用
 * @param data 数据
 */
function  adminUserBalance(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.balance').text(data.msg);
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
}

/**
 * AJAX回调函数,供点击充值用
 * @param data 数据
 */
function  adminUserCharge(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.success .div1').removeClass('div1')
            .animate({marginLeft:'+200px'},5000);
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
    //用户ID
   var userId;
}
function ParamsModelCharge() {
    //用户ID
    var userId;
    //充值金额
    var fee;
    //备注
    var remark;
}
