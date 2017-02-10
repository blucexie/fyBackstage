/**
 * Created by funinbook on 2016/11/23.
 */
$(function () {
    funinbookSecurityAjax("/user/account/getBalance", null, "POST", "true", executeRechargeBalance);


    $('.btn').click(function () {
        var money = $("input[class*='recc']").attr('value')||$('.shuru').val();
        var model = new ParamsModel();
        model.fee=money;
        funinbookSecurityAjax("/alipay/getAlipyConfig", model, "POST", "true", executeRecharge);

    })
});

/**
 * AJAX回调函数,用户余额使用
 */
function executeRechargeBalance(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.balance').text(data.msg);
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
 * AJAX回调函数,点击充值使用
 */
function executeRecharge(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('#alipaysubmit').attr("action",data.msg.alipayGateway);
        $('#alipaysubmit input[name="service"]').attr("value",data.msg.service);
        $('#alipaysubmit input[name="sign_type"]').attr("value",data.msg.signType);
        $('#alipaysubmit input[name="sign"]').attr("value",data.msg.sign);
        $('#alipaysubmit input[name="partner"]').attr("value",data.msg.partner);
        $('#alipaysubmit input[name="seller_id"]').attr("value",data.msg.sellerId);
        $('#alipaysubmit input[name="_input_charset"]').attr("value",data.msg.inputCharset);
        $('#alipaysubmit input[name="payment_type"]').attr("value",data.msg.paymentType);
        $('#alipaysubmit input[name="notify_url"]').attr("value",data.msg.notifyUrl);
        $('#alipaysubmit input[name="subject"]').attr("value",data.msg.subject);
        $('#alipaysubmit input[name="total_fee"]').attr("value",data.msg.totalFee);
        $('#alipaysubmit input[name="body"]').attr("value",data.msg.body);
        $('#alipaysubmit input[name="out_trade_no"]').attr("value",data.msg.tradeNo);
        $('#alipaysubmit input[name="return_url"]').attr("value",data.msg.returnUrl);
        if(data.success!==1){
            $('.error1').removeClass('.error1')
                .animate({marginLeft:'+100px'},4000);
        }
    } else {
        //状态码对应信息不能为空
        if(success.length != 0) {
            alert(success);
        }
    }
    $('#alipaysubmit').submit();
}
function ParamsModel() {
    //充值金额
    var fee;
}
