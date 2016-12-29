/**
 * Created by funinbook on 2016/11/24.
 */
$(function () {

    $("input[name='oldPassword']").blur(function () {
        var $oldPassword =  $('#oldPassword');
        if($oldPassword.val()!=="") {
            $('.hint').text("");
            var model = new ParamsModel();
            //输入原始密码
            model.password=$oldPassword.val();
            funinbookSecurityAjax("/user/verifyOldPassword", model, "POST", "true", verifyPassword);

        }else if($oldPassword.val()==""){
            $('.hint').text("请输入原始密码").css('color','red')
        }
    });
    //密码验证
    $('#loginForm').validate({
        debug: true,
        rules: {
            newPassword: {
                required: true,
                minlength: 6,
                maxlength: 10
            },
            "newPassword2":{
                equalTo: "#newPassword"
            }
        },
        messages: {
            newPassword: {
                required: '请输入密码',
                minlength: '密码不能少于6位',
                maxlength: '密码不能大于10位'
            },
            "newPassword2": {
                equalTo: "两次输入密码不一致"
            }
        },
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).fadeOut().fadeIn();
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).addClass(validClass);
        }

    });

    //点击确定提交
    $('.btn').click(function () {
        var oldPassword = $("input[name='oldPassword']").val();
        var newPassword = $("input[name='newPassword']").val();
        var newPassword2 = $("input[name='newPassword2']").val();
        var oldPasswordText =  $('.hint').text();
        if(oldPasswordText=='输入正确' && newPassword===newPassword2 && newPassword!=="" &&newPassword2!==""&&newPassword.length>=6 ){
            var model = new ParamsModelChange();
            //输入原始密码
            model.oldPassword=$('#oldPassword').val();
            model.password=newPassword;
            funinbookSecurityAjax("/admin/updatePassWord", model, "POST", "true", modifyPassword);

        }else{
            alert("请检查输入是否正确")
        }
    });

});
/**
 * AJAX回调函数,供验证原始密码使用
 * @param data 数据
 */
function  verifyPassword(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.hint').text("输入正确").css('color','green');
    } else {
        if(success=='密码错误'){
            $('.hint').text("输入不正确").css('color','red')
        }
        //状态码对应信息不能为空
        else if(success.length != 0) {
            alert(success);
        }
    }
}
/**
 * AJAX回调函数,供提交修改密码使用
 * @param data 数据
 */
function  modifyPassword(data){
    //获取状态码信息
    var success = this.success(data.success);
    //判断后台是否返回正确状态
    if(success == true) {
        $('.success .div1').removeClass('div1')
            .animate({marginLeft:'+200px'},5000);
        setTimeout(function () {
            window.location.href ="login.html";
        },5000);
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
    //原始密码
    var password;

}
function ParamsModelChange() {
    //原始密码
    var oldPassword;
    //新密码
    var password;

}