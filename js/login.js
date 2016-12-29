/**
 * Created by funinbook on 2016/11/23.
 */
$(function() {
	$(".quxiao").click(function() {
		$(".wangji-m").hide();
		$(".fankui").hide();
		$(".xiabu").hide();
		$(".deng-z").hide();
	});

	$(".denglu").click(function() {
		$(".deng-z").show();
	});

	$(".link_list").click(function() {
		$(".deng-z").show();
	});

	$(".w1").click(function() {
		$(".wangji-m").show();
		$(".fankui").hide();
		$(".xiabu").hide();
		$(".deng-z").hide();
	});

	$("#xia").click(function() {
		$(".xiabu").show();
		$(".wangji-m").hide();
		$(".fankui").hide();
		$(".deng-z").hide();
	});

	$(".yj").click(function() {
		$(".fankui").show();
		$(".xiabu").hide();
		$(".wangji-m").hide();
		$(".deng-z").hide();
	});

	/**
	 *发送短信时间间隔 
	 */
	var wait = 10;

	/**
	 * 找回密码用
	 * @param {Object} o 剩余时间
	 */
	function time(o) {
		if(wait == 0) {
			o.removeAttribute("disabled");
			o.value = "免费获取验证码";
			wait = 60;
		} else {
			o.setAttribute("disabled", true);
			o.value = "" + wait + "s后重新发送";
			wait--;
			setTimeout(function() {
					time(o)
				},
				1000)
		}
	}

	/**
	 * 找回密码用
	 */
	document.getElementById("btn").onclick = function() {
		time(this);
	};

	/**
	 * 点击登录操作
	 */
	$("body").keydown(function() {
		if (event.keyCode == "13") {
			$('#logon').click();
		}
	});
	$('#logon').click(function() {
		var $prompt = $('.prompt');
		var $prompt1 = $('.prompt1 span');
		if($("#txtUser").val() == "") {
			$prompt.removeClass('prompt');
			$prompt1.text('用户名不能为空');
			return false;
		} else if($("input[name='password']").val() == "") {
			$prompt.removeClass('prompt');
			$prompt1.text('密码不能为空');
			return false;
		} else if($("input[name='validation']").val() == "") {
			$prompt.removeClass('prompt');
			$prompt1.text('验证码不能为空');
			return false;
		} else {
			//new一个请求参数对象
			var model = new ParamsModel();
			//登录名
			model.userId = $("input[name='txtUser']").val();
			//密码
			model.password = $("input[name='password']").val();
			//验证码
			model.verifyCode = $("input[name='validation']").val();
			//发送ajax请求
			funinbookUnsafeAjax("/user/login", model, "POST", "true", execute);
		}
	})
});

/**
 * ajax回调执行方法
 * @param {Object} data 数据
 */
function execute(data) {
	var success = this.success(data.success);

	//判断状态码做出对应操作
	if(this.success(data.success) == true) {
		//保存 加密/解密 key
		sessionStorage.setItem("key", data.msg);
		//跳转到账户信息页面
		window.location.href = "userAccount.html";
	}else {
		var $prompt = $('.prompt');
		var $prompt1 = $('.prompt1 span');
		if(this.success(data.success)=='验证码错误'){
			$prompt.removeClass('prompt');
			$prompt1.text('验证码错误');
		}else if(success=='未知用户'){
			$prompt.removeClass('prompt');
			$prompt1.text('未知用户');
		}else if(success=='密码错误'){
			$prompt.removeClass('prompt');
			$prompt1.text('密码错误');
		}else if(success=='用户已锁定'){
			$prompt.removeClass('prompt');
			$prompt1.text('用户已锁定');
		}else if(success=='用户名密码错误过多'){
			$prompt.removeClass('prompt');
			$prompt1.text('用户名密码错误过多');
		}else if(success=='操作失败'){
			$prompt.removeClass('prompt');
			$prompt1.text('操作失败');
		}else if(success=='没有登录'){
			$prompt.removeClass('prompt');
			$prompt1.text('没有登录');
		}else if(success=='没有权限'){
			$prompt.removeClass('prompt');
			$prompt1.text('没有权限');
		}else if(success=='系统错误'){
			$prompt.removeClass('prompt');
			$prompt1.text('系统错误');
		}else if(success=='参数为空'){
			$prompt.removeClass('prompt');
			$prompt1.text('参数为空');
		}
		//状态码对应信息不能为空
		if(success.length != 0) {
			$prompt1.text(success);
		}
	}
}

/**
 * 请求参数对象
 */
function ParamsModel() {
	//用户id
	var userId;
	//密码
	var password;
	//验证码
	var verifyCode;
}