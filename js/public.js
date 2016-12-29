/**
 * Created by funinbook on 2016/11/8.
 */
$(function() {
	$('.account ul li').click(function() {
		$(this).addClass('active');
		$(this).siblings().removeClass('active');

	});
	$('.ol1').click(function() {
		location.href = 'userAccount.html'
	});
	$('.ol2').click(function() {
		location.href = 'userInterface.html'
	});
	$('.ol3').click(function() {
		location.href = 'userReport.html'
	});
	$('.ol4').click(function() {
		location.href = 'userRecharge.html'
	});
	$('.ol5').click(function() {
		location.href = 'userRecord.html'
	});
	$('.ol6').click(function() {
		location.href = 'userEnterprise.html'
	});
	$('.repair').click(function() {
		location.href = 'modifyPassword.html'
	});

	$('.rec').click(function() {
		$(this).addClass("recc");
		$(this).siblings().removeClass("recc");
	});
	$('.shuru').focus(function() {
		$('.rec').removeClass("recc")
	});

	$('#logo img').click(function() {
		window.location.href = 'http://www.funinbook.com';
	});

	// 判断sessionStorage有没有用户信息,有就从sessionStorage中读取
	if (getUserInfo() == null) {
		// 向后台查询用户信息
		funinbookSecurityAjax("/user/getUserInfo", null, "POST", true,
				executeUserInfo);
	} else {
		// 获取用户信息
		var userInfo = getUserInfo();
		// 把公司名称填充到界面
		$('.companyName').text(userInfo.name);
	}

	/**
	 * 退出登录触发事件
	 */
	$('.out').click(function() {
		clearSessionStorage();
		// 退出登录
		funinbookUnsafeAjax("/user/logout", null, "POST", true, executeLogOut);
	});
});

/**
 * AJAX回调函数,账户信息用
 * 
 * @param {Object}
 *            data 数据
 */
function executeUserInfo(data) {
	// 未登录则不操作
	if (data.success == 9) {
		return;
	}
	// 填充页面数据
	$('.companyName').text(data.msg.name);
	// 清除用户数据
	this.clearUserInfo();
	// 向session中保存数据
	this.setUserInfo(formatJson(data.msg));
}

/**
 * AJAX回调函数,退出登录用
 * 
 * @param {Object}
 *            data 数据
 */
function executeLogOut(data) {
	// 获取状态码信息
	var success = this.success(data.success);
	// 判断后台是否返回正确状态
	if (success == true) {
		// 清除所有session
		this.clearSessionStorage();
		// 返回登录页面
		window.location.href = "login.html";
	} else {
		// 状态码对应信息不能为空
		if (success.length != 0) {
			alert(success);
		}
	}
}

/**
 * 状态码列表
 * 
 * @param {Object}
 *            success 状态码
 */
function success(success) {
	if (success == 0) {
		return '系统错误';
	} else if (success == 1) {
		// 操作成功
		return true;
	} else if (success == 2) {
		return '验证码错误';
	} else if (success == 3) {
		return '未知用户';
	} else if (success == 4) {
		return '密码错误';
	} else if (success == 5) {
		return '用户已锁定';
	} else if (success == 6) {
		return '用户名密码错误过多';
	} else if (success == 7) {
		// 结果集为空
		$('tr td').text("");
		$('.start').text(0);
		$('.all').text(0);
		$('.allPage').text(0);
		$('#pullDown').html("");
	} else if (success == 8) {
		return '操作失败';
	} else if (success == 9) {
		// 未登录
		clearSessionStorage();
		window.location.href = 'login.html';
	} else if (success == 10) {
		return '没有权限';
	} else if (success == 11) {
		return '参数为空';
	} else if (success == 12) {
		return '密匙错误';
	} else if (success == 0) {
		return '系统错误';
	}
}

/**
 * 获取 解密/加密 key
 */
function getDESKey() {
	return sessionStorage.getItem('key');
}

/**
 * 添加 解密/加密 key
 * 
 * @param {Object}
 *            key 解密/加密 key
 */
function setDESKey(key) {
	sessionStorage.setItem('key', key);
}

/**
 * 获取用户信息
 */
function getUserInfo() {
	return JSON.parse(sessionStorage.getItem('userInfo'));
}

/**
 * 添加用户信息
 * 
 * @param {Object}
 *            user 用户信息
 */
function setUserInfo(user) {
	sessionStorage.setItem('userInfo', user);
}

/**
 * 清除用户信息
 */
function clearUserInfo() {
	sessionStorage.removeItem('userInfo');
}

/**
 * 清除 解密/加密 key
 */
function clearDESKey() {
	sessionStorage.removeItem('key');
}

/**
 * 清除所有session
 */
function clearSessionStorage() {
	sessionStorage.clear();
}

/**
 * 获取当前年月日（yyyyMMdd）
 * 
 * @returns
 */
function getNowDate1() {
	// 当前时间对象
	var thedate = new Date();
	// 获取当前年
	var yyyy = thedate.getFullYear();
	// 获取当前月
	var MM = thedate.getMonth() + 1;
	// 获取当前日
	var dd = thedate.getDate();
	// 格式化成2位
	if (dd.toString().length == 1) {
		dd = "0" + dd;
	}
	// (yyyyMMdd格式)
	var nowDate = yyyy.toString() + MM.toString() + dd.toString();
	// 返回日期
	return nowDate;
}

/**
 * 从新封装的ajax方法（提供加密解密但不安全）
 * 
 * @param {Object}
 *            url 请求地址 (NOT NULL)
 * @param {Object}
 *            paramsModel 请求参数（对象）
 * @param {Object}
 *            type 请求类型(POST,GET)(NOT NULL)
 * @param {Object}
 *            async 同步异步请求(NOT NULL)
 */
function funinbookUnsafeAjax(url, paramsModel, type, async, execute) {
	// 加密后的结果集
	var data = null;
	// 参数不为空就加密
	if (paramsModel != null) {
		// 生成一个key加密,然后把数据加密
		data = encryptData(formatJson(paramsModel), getNowDate1());
	}
	// 构造ajax请求
	$.ajax({
		url : url,
		type : type,
		async : async,
		data : {
			"fy_json" : data
		},
		success : function(data) {
			// 判断是否有回调函数
			if (execute == null) {
				return;
			}
			// 生成一个key解密，并把数据解密
			var result = decryptData(data, getNowDate1());
			// 解析成json对象执行
			execute(JSON.parse(result));
		},
		error : function(data) {
			console.log(data)
		}
	});
}

/**
 * 从新封装的ajax方法（提供加密解密但安全的）
 * 
 * @param {Object}
 *            url 请求地址 (NOT NULL)
 * @param {Object}
 *            paramsModel 请求参数（对象）
 *  @param {Object}
 *            type 请求类型(POST,GET)(NOT NULL)
 * @param {Object}
 *            async 同步异步请求(NOT NULL)
 */
function funinbookSecurityAjax(url, paramsModel, type, async, execute) {
	// 加密后的结果集
	var data = null;
	// 参数不为空就加密
	if (paramsModel != null) {
		// 生成一个key加密,然后把数据加密
		data = encryptData(formatJson(paramsModel), getDESKey());
	}
	// 构造ajax请求
	$.ajax({
		url : url,
		type : type,
		async : async,
		data : {
			"fy_json" : data
		},
		success : function(data) {
			// 判断是否有回调函数
			if (execute == null) {
				return;
			}
			// 获取 加密/解密 key，并解密数据
			var result = decryptData(data, getDESKey());
			// 如果为空尝试自己生成一个key解密
			if (result.length == 0) {
				result = decryptData(data, getNowDate1());
			}
			// 解析成json对象执行
			execute(JSON.parse(result));
		},
		error : function(data) {
			console.log(data)
		}
	});
}

/**
 * 加密数据
 * 
 * @param {Object}
 *            data 待加密的数据
 */
function encryptData(data, key) {
	// 加密key
	var keyHex = CryptoJS.enc.Utf8.parse(key);
	// 加密
	var encrypted = CryptoJS.DES.encrypt(data.toString(), keyHex, {
		mode : CryptoJS.mode.ECB,
		padding : CryptoJS.pad.Pkcs7
	});
	// 返回解密后的数据
	return encrypted.toString();
}

/**
 * 解密数据
 * 
 * @param {Object}
 *            data 待解密的数据
 */
function decryptData(data, key) {
	try {
		// 解密key
		var keyHex = CryptoJS.enc.Utf8.parse(key);
		// 解密
		var decrypted = CryptoJS.DES.decrypt({
			ciphertext : CryptoJS.enc.Base64.parse(data)
		}, keyHex, {
			mode : CryptoJS.mode.ECB,
			padding : CryptoJS.pad.Pkcs7
		});
		// 返回加密后的信息
		return decrypted.toString(CryptoJS.enc.Utf8);
	} catch (err) {
		return '';
	}
}

/**
 * 把对象格式化json
 * 
 * @param {Object}
 *            model 对象
 */
function formatJson(model) {
	// 把对象转换成json
	var json = JSON.stringify(model);
	// 返回格式化后的json串
	return json;
}

/**
 * 
 * @param url 请求url
 * @param {Object}
 * 				 paramsModel 请求参数(JSON)
 * @returns
 */
function post(url, paramsModel) {        
    var temp = document.createElement("form");        
    temp.action = url;        
    temp.method = "post";        
    temp.style.display = "none";        
    var opt = document.createElement("textarea");        
    opt.name = 'fy_json';        
    opt.value = encryptData(formatJson(paramsModel), getDESKey());   
    temp.appendChild(opt);        
    document.body.appendChild(temp);        
    temp.submit();        
    return temp;        
}        

