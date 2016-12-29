/**
 * Created by funinbook on 2016/11/24.
 */
$(function () {
//获取企业信息
   funinbookSecurityAjax("/user/getUserInfo", null, "POST", "true", executeAccountInfo);


    $('.btn').click(function () {
        var configType = null;
        var message1 = $("input[name='message']").prop('checked');
        var email1 = $("input[name='email1']").prop('checked');
        if(message1 == true && email1 == false){
            configType=2
        }else if(email1 == true && message1 == false){
            configType=1
        }else if(message1 == true && email1 == true){
            configType=3
        }else if(message1 == false && email1 == false){
            configType=0
        }
        var model = new ParamsModel();
        //余额提醒
        model.balanceThresole=$('.remind').val();
        //选中状态
        model.sendConfigType=configType+"";

        funinbookSecurityAjax("/user/updateSendConifg", model, "POST", "true", null);
    });
});


function executeAccountInfo(data) {
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $("input[name='firm']").val(data.msg.name);
        $("input[name='address']").val(data.msg.address);
        $("input[name='cardNumber']").val(data.msg.bankAccount);
        $("input[name='bank']").val(data.msg.bank);
        $("input[name='contacts']").val(data.msg.userName);
        $("input[name='email']").val(data.msg.email);
        $("input[name='telephone']").val(data.msg.userTel);
        $(".remind").val(data.msg.balanceThresole);
        if(data.msg.sendConfigType==0){
            $("input[name='message']").prop("checked",false);
            $("input[name='email1']").prop("checked",false);
        }else if(data.msg.sendConfigType==1){
            $("input[name='message']").prop("checked",false);
            $("input[name='email1']").prop("checked",true);
        }else if(data.msg.sendConfigType==2){
            $("input[name='message']").prop("checked",true);
            $("input[name='email1']").prop("checked",false);
        }else if(data.msg.sendConfigType==3){
            $("input[name='message']").prop("checked",true);
            $("input[name='email1']").prop("checked",true);
        }
        //清除用户数据
     //   this.clearUserInfo();
        //向session中保存数据
     //   this.setUserInfo(formatJson(data.msg));
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
    //余额提醒
    var balanceThresole;
    //选中状态
    var sendConfigType;

}
