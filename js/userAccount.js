/**
 * Created by funinbook on 2016/11/23.
 */
$(function() {
	//判断sessionStorage有没有用户信息,有就从sessionStorage中读取
	if (getUserInfo() == null) {
		// 发送ajax请求,查询账户信息
		funinbookSecurityAjax("/user/getUserInfo", null, "POST", "true",
				executeAccountInfo);
	} else {
		// 获取用户信息
		var userInfo = getUserInfo();
		var time = userInfo.loginTime;
		time = changeTime(time);
		function changeTime(str) {
			var year = str.slice(0, 4);
			var month = str.slice(4, 6);
			var day = str.slice(6, 8);
			var time = str.slice(8, 10);
			var minute = str.slice(10, 12);
			var newTime = year + '.' + month + '.' + day + ' ' + time + ':'
					+ minute;
			return newTime;
		}
		// 填充页面数据
		$('.qId span').text(userInfo.userId);
		$('.user span').text(userInfo.userName);
		$('.userTel span').text(userInfo.userTel);
		$('.loginTime span').text(time);
		$('.title h3').text(userInfo.name);
	}

	// 发送ajax请求,查询余额信息
	funinbookSecurityAjax("/user/account/getBalance", null, "POST", "true",
			executeUserBalance);
	$('.query li:nth-child(1)').click(function() {
		// 下载报表
		post("/user/excle/downInterfaceReport",null);
	});
	// 下载详细报表
	$('.query li:nth-child(2)').click(function() {
		post("/user/excle/downInterfaceInfoReport",null);
	});
});

/**
 * AJAX回调函数,账户信息用
 */
function executeAccountInfo(data) {
	// 获取状态码信息
	var success = this.success(data.success);
	// 判断后台是否返回正确状态
	if (success == true) {
		var time = data.msg.loginTime;
		time = changeTime(time);
		function changeTime(str) {
			var year = str.slice(0, 4);
			var month = str.slice(4, 6);
			var day = str.slice(6, 8);
			var time = str.slice(8, 10);
			var minute = str.slice(10, 12);
			var newTime = year + '.' + month + '.' + day + ' ' + time + ':'
					+ minute;
			return newTime;
		}
		$('.qId span').text(data.msg.userId);
		$('.user span').text(data.msg.userName);
		$('.userTel span').text(data.msg.userTel);
		$('.loginTime span').text(time);
		$('.title h3').text(data.msg.name);
		// 清除用户数据
		this.clearUserInfo();
		// 向session中保存数据
		this.setUserInfo(formatJson(data.msg));
	} else {
		// 状态码对应信息不能为空
		if (success.length != 0) {
			alert(success);
		}
	}
}

/**
 * AJAX回调函数,用户余额使用
 */
function executeUserBalance(data) {
	// 获取状态码信息
	var success = this.success(data.success);
	// 判断后台是否返回正确状态
	if (success == true) {
		$('.money span').text(data.msg)
	} else {
		// 状态码对应信息不能为空
		if (success.length != 0) {
			alert(success);
		}
	}
}