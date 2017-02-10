/**
 * Created by funinbook on 2017/2/7.
 */
$(function () {
    funinbookSecurityAjax("/user/getUserSendConifg", null, "POST", "true", executeAccountInfo);
    var oldThresole = null;
    var oldSendStatus = null;
    var oldEmailMoble = null;
    var oldThresole1 = null;
    var oldSendStatus1 = null;
    var oldEmailMoble1 = null;
    function executeAccountInfo(data){
        console.log(data);

        var success = this.success(data.success);
        if(success == true) {
            for(var i = 0;i<data.msg.length;i++){
                oldThresole = data.msg[data.msg.length-2].balanceThresole;
                oldSendStatus = data.msg[data.msg.length-2].sendStatus;
                oldEmailMoble = data.msg[data.msg.length-2].emailMoblie;
                oldThresole1 = data.msg[data.msg.length-1].balanceThresole;
                oldSendStatus1 = data.msg[data.msg.length-1].sendStatus;
                oldEmailMoble1 = data.msg[data.msg.length-1].emailMoblie;
                var sendStatus = data.msg[i].sendStatus;
                var sendType = data.msg[i].sendType;
                
                if(sendType==1){
                    $('#email').val(data.msg[i].emailMoblie);
                    $('#msgAdd').val(data.msg[i].ccEmail);
                    $('#cAdd').val(data.msg[i].bccEmail);
                    $('#threshold').val(data.msg[i].balanceThresole);
                    if(sendStatus==1){
                        $('.eStart').attr("checked",'checked');
                    }else if(sendStatus==0){
                        $('.eStop').attr("checked",'checked');
                    }
                }else if(sendType==2){
                    $('#phone').val(data.msg[i].emailMoblie);
                    $('#threshold1').val(data.msg[i].balanceThresole);
                    if(sendStatus==1){
                        $('.pStart').attr("checked",'checked');
                    }else if(sendStatus==0){
                        $('.pStop').attr("checked",'checked');
                    }
                }
                $('#loading').hide();
                $('.zhez').hide();
            }
        }else{
            if(success!== 0) {
                return success;
            }
        }
    }
    //邮箱保存
    $('.eBtn').click(function () {
        var model = new ParamsModelSaveE();
        var start = $(".eStart").prop('checked');
        var stop = $(".eStop").prop('checked');
        if(start==true){
            sendStatus=1
        }else if(stop==true){
            sendStatus=0;
        }
        model.oldThresole =oldThresole;
        model.oldSendStatus =oldSendStatus;
        model.oldEmailMoble = oldEmailMoble;
        model.sendType = "1";
        model.sendStatus = sendStatus+"";
        model.thresole = $('#threshold').val();
        model.emailMoble = $('#email').val();
        model.ccEmail = $('#msgAdd').val();
        model.bccEmail = $('#cAdd').val();
        funinbookSecurityAjax("/user/updateSendConifg", model, "POST", "true", null);
        window.location.reload();
    });
    //短信保存
    $('.pBtn').click(function () {
        var model = new ParamsModelSaveP();
        var start = $(".pStart").prop('checked');
        var stop = $(".pStop").prop('checked');
        if(start==true){
            sendStatus=1
        }else if(stop==true){
            sendStatus=0;
        }
        model.oldThresole =oldThresole1;
        model.oldSendStatus =oldSendStatus1;
        model.oldEmailMoble = oldEmailMoble1;
        model.sendType = "2";
        model.sendStatus = sendStatus+"";
        model.thresole = $('#threshold1').val();
        model.emailMoble = $('#phone').val();
        funinbookSecurityAjax("/user/updateSendConifg", model, "POST", "true", null);
        window.location.reload();
    })

});
/**
 * 请求参数对象
 */
function ParamsModel() {
    //余额提醒
    var balanceThresole;
    //选中状态
    var sendConfigType;

}
function ParamsModelSaveE(){
  //之前设置的阀值
   var  oldThresole;
    //之前设置的发送状态(0:停用 1:启用)
   var oldSendStatus;
   // 之前设置的邮箱或者手机号
   var oldEmailMoble;
   //发送类型(1:邮箱 2:短信)
   var sendType;
    // 发送状态(0:停用 1:启用)
   var sendStatus;
    //余额阀值
   var thresole;
    //邮箱或者手机号
   var emailMoble;
    // 抄送人
   var ccEmail;
    //密送人
   var bccEmail;
}
function ParamsModelSaveP(){
    //之前设置的阀值
    var  oldThresole;
    //之前设置的发送状态(0:停用 1:启用)
    var oldSendStatus;
    // 之前设置的邮箱或者手机号
    var oldEmailMoble;
    //发送类型(1:邮箱 2:短信)
    var sendType;
    // 发送状态(0:停用 1:启用)
    var sendStatus;
    //余额阀值
    var thresole;
    //邮箱或者手机号
    var emailMoble;
}