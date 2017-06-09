//var GLOBAL_URL = "https://mobile.e-yao.com.cn/YfyServiceAgent/YdjyV2action.action";
var GLOBAL_URL = "http://101.231.124.9:56679/YfyServiceAgent/YdjyV2action.action";
//var GLOBAL_URL = "http://localhost:8080/YfyServiceAgent/YdjyV2action.action";
//图片加载失败时默认图片
var defaultImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4BAMAAADLSivhAAAAFVBMVEXu7u7d3d3r6+vm5ubh4eHj4+Po6Oj0yq+dAAABkElEQVRYw+2Wy26CUBCGFZG1gxzXqEnXapOupZqutaFdY/v+79BLDEf5wZ85aRMX8+0a+jk4VweGYRiGYej5LESypyA1OsovLg9wC5Fgey01U60bywVb/Ut7MnXg8NCFSHDokTRYKeR5U051bx383okAuS7XofmeozxRtCYw6y0fUXa9ZUEyhYz0noo/l/P/l5flnsq8xihzN1w+XRu7x5qPxTeKJfACtc82ffvyua0CrzwwjkJCF9Kpu6XGdZPnrDlw+odsnY0hcJssfIGk3c+2NNerbnlKxxhySZotaalTuWtp2wPJ1+T8eXWYgmzSGAs18jLZpEPxVLVcYT4ckXMfzoGcEfmy40AWpRyp5YFCjuHxshR52/SSx/DYl2rE5ASy7eWY3i2scyRS54NMxhHH7qFqOfcpmefJrc24JZtkeuvoVmyH3VirGduefmb5V8YAs+4fdSt+MfKutep6nIy063QeyJVs5DRmHYJB3HUR8Nog0boZIyqo61mWxfkf3eLnzwt3/z4wDMMwDOPe+QK4wmsCjbWzEAAAAABJRU5ErkJggg==";
//医药云后台图片路径
//var classify_URL = "https://mobile.e-yao.com.cn/medical_cloud_yfy";
var classify_URL = "http://101.231.124.9:56679";
//版本号
var app_version = "V1.0.0";
/**
 * 打开员福云原生页面
 * @param {Object} yfypage
 * 	toShowShopcart 打开员福云购物车页面
 * 	toShowOrders 打开员福云所有订单页面
 * 	toPopUpView 返回到员福云来源页面
 */
function openYfyPage(yfypage) {
	if (typeof(huiDaoJsBridge) == "undefined") {
		return;
	}
	huiDaoJsBridge.openApp({
		params: yfypage,
		onResponse: function(res) {
			console.log('openApp res:' + res);
			alert(res);
		}
	});
}
function ShowMore() {
	var html = '<div id="menumask"><div id="moremenu" class="bc1"><div id="menuicon"></div><div style="margin-top:5px; margin-bottom:10px;">' + 
					'<div class="ub h22 lh22 pl5 ub-ac ubb menu2page" id="index1">' + 
						'<div class="ub-img img64"></div>' + 
						'<div class="fs8 c1 ml5">首页</div>' + 
					'</div>' + 
					'<div class="ub h22 lh22 pl5 ub-ac ubb menu2page" id="classify">' +
						'<div class="ub-img img65"></div>' + 
						'<div class="fs8 c1 ml5">分类</div>' + 
					'</div>' + 
					'<div class="ub h22 lh22 pl5 ub-ac ubb menu2page" id="allCart">' + 
						'<div class="ub-img img67"></div>' + 
						'<div class="fs8 c1 ml5">购物车</div>' + 
					'</div>' + 
					'<div class="ub h22 lh22 pl5 ub-ac menu2page" id="PersonalCenter">' + 
						'<div class="ub-img img66"></div>' + 
						'<div class="fs8 c1 ml5">个人中心</div>' + 
					'</div>' + 
				'</div></div></div>';
	$("body").append(html);
	$("#menumask").on("click", function(event) {
		hideMore();
	});
	$(".swiper-container").scroll(function() {
		hideMore();
	});
	$("#more").click(function(event) {
		$("#menumask").show();
	});
	$(".menu2page").click(function(e){
		e.preventDefault();
		e.stopPropagation();
		var uri = $(this).attr("id");
		if(uri == 'classify'){
			localStorage.removeItem("cid");
			localStorage.removeItem("cid_name");
		}
		window.location.href = uri + ".html";
	});
}

function hideMore() {
	$("#menumask").hide();
}

function changeTwoDecimal_f(x) {
	var f_x = parseFloat(x);
	if (isNaN(f_x)) {
		alert('商品错误');
		return false;
	}
	var f_x = Math.round(x * 100) / 100;
	var s_x = f_x.toString();
	var pos_decimal = s_x.indexOf('.');
	if (pos_decimal < 0) {
		pos_decimal = s_x.length;
		s_x += '.';
	}
	while (s_x.length <= pos_decimal + 2) {
		s_x += '0';
	}
	return s_x;
}

function Loading() {
	var len = $("#loading").length;
	var load = '<div id="loading">' +
		'<div class="spinnerBg" len=' + len + '></div>' +
		'<div class="spinner vAlign">' +
		'<div class="bounce1"></div>' +
		'<div class="bounce2"></div>' +
		'<div class="bounce3"></div>' +
		'</div>' +
		'</div>';
	if (len > 0) {
		var length = $("#loading>.spinnerBg").attr("len");
		$("#loading>.spinnerBg").attr("len", Number(length) + 1);
		return;
	}
	$("body").append(load);
}

function noLoading() {
	var len = $("#loading>.spinnerBg").attr("len");
	if (len > 0) {
		$("#loading>.spinnerBg").attr("len", Number(len) - 1);
		return;
	}
	setTimeout('$("#loading").remove()', 500);
	$("#slideUp1,#slideUp2").hide();
}
//返回顶部
function goTop() {
	var elem = $("#gotop");
	if(elem.length == 0) return;
	$(window).scroll(function() {
		var st = $("body").scrollTop();
		var h = $(window).height();
		st > h ? elem.fadeIn("fast") : elem.fadeOut("fast");
	});
	elem.click(function(event) {
		event.preventDefault();
		$("body").animate({
			"scrollTop": 0
		}, 800);
	});
}
//初始化s_select
function s_select(dom) {
	var _s = $(dom);
	var _l = _s.find(".s_selected").length;
	if (_l != 1) {
		$(dom + " .s_list>.s_item:first").addClass("s_selected")
			.siblings().removeClass("s_selected");
	}
	var v = $(dom + " .s_selected").text();
	var c = $(dom + " .s_selected").attr("s_item_id");
	$(dom + ">.s_choice").html(v);
	$(dom + ">[name=s_choice]").val(c);
	$(dom + ">.s_choice").click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		$(dom + ">.s_content").fadeToggle();
	});
	$(dom + " .s_list>.s_item").click(function(event) {
		event.preventDefault();
		event.stopPropagation();
		$(this).addClass("s_selected")
			.siblings().removeClass("s_selected");
		var _v = $(this).text();
		var _c = $(this).attr("s_item_id");
		if (_c == 1) {
			window.location.href = "productSearch.html";
		}
		if (_c == 2) {
			window.location.href = "productSearchByYD.html";
		}
		$(dom + ">.s_choice").html(_v);
		$(dom + ">[name=s_choice]").val(_c);
		$(dom + ">.s_content").fadeOut();
	});
	$("body>div:first").click(function() {
		$(dom + ">.s_content").fadeOut();
	});
}

//获取所有购物车商品数量
function getAllCartCount(userid) {
	if (userid != null && userid != "" && userid != "null") {
		var uri = "[{\"userId\":\"" + userid + "\",\"yyyCode\":\"100045\"}]"
		var jsonStr = strEnc(uri, "100001", "", "");
		$.ajax({
			url: GLOBAL_URL + "?json=" + jsonStr,
			type: "GET",
			timeout: 60000,
			beforeSend: function() {}, //添加loading信息
			success: function(data) {
				var data = JSON.parse(data);
				if (data.success == "1" && data.data > 0) {
					$(".lccount").html(data.data).removeClass("uhide");
				} else {
					$(".lccount").html(0).addClass("uhide");
				}
			}
		});
	}
}
//输入正则验证，标点符号不包含英文的'和"
function valid1(str, msg) { //汉字和字母
	var reg = /[^\u4e00-\u9fa5a-zA-Z ]/g;
	if (str.match(reg)) {
		if (msg) toast(msg);
		return false;
	}
	return true;
}

function valid2(str, msg) { //非汉字、字母、数字和标点符号
	var reg = /[^\u4e00-\u9fa5a-zA-Z0-9《》!！……:：……;；“”‘’、\/+=-_——.。,，?？{}()（）\[\]【】{} ]/g;
	if (str.match(reg)) {
		if (msg) toast(msg);
		return false;
	}
	return true;
}

function valid3(str, msg) { //非汉字、字母和数字
	var reg = /[^\u4e00-\u9fa5a-zA-Z0-9 ]/g;
	if (str.match(reg)) {
		if (msg) toast(msg);
		return false;
	}
	return true;
}

function valid4(str, msg) { //非汉字、字母、数字和（）
	var reg = /[^\u4e00-\u9fa5a-zA-Z0-9（）() ]/g;
	if (str.match(reg)) {
		if (msg) toast(msg);
		return false;
	}
	return true;
}

function valid5(str, msg) { //非汉字、字母、数字、标点符号和*
	var reg = /[^\u4e00-\u9fa5a-zA-Z0-9《》!！……:：;；“”‘’、\/+=-_——.。,，?？{}()（）\[\]【】{}* ]/g;
	if (str.match(reg)) {
		if (msg) toast(msg);
		return false;
	}
	return true;
}

function valid6(str, msg) { //中文、字母、数字和标点符号
	var reg = /^([\u4E00-\u9FFF]|[a-zA-Z0-9]|[\n《》~`!！#……&*+-_//=\\:：;；"“”'‘’、.。,，?？{} ()\[\]])+$/;
	if (reg.test(str)) {
		return true;
	} else {
		if (msg) toast(msg);
		return false;
	}
}

function valid7(str, msg) { //字母、数字
	var reg = /^[a-zA-Z0-9]+$/g;
	if (reg.test(str)) {
		return true;
	} else {
		if (msg) toast(msg);
		return false;
	}
}
//浏览记录
function updateHistory(record) {
	//获取用户的浏览记录
	var userid = localStorage.getItem("userid");
	var recordhistory = localStorage.getItem("record_" + userid);
	var name = record.name;
	var price = changeTwoDecimal_f(record.price);
	var img = record.img;
	var drugcode = record.drugcode;
	var DRUGSUPPLIERCODE = record.DRUGSUPPLIERCODE;
	var shopname = record.shopname;
	var dddd = drugcode + "_" + DRUGSUPPLIERCODE;
	//						var record1 = {name:name,price:price,img:img,drugcode:drugcode,DRUGSUPPLIERCODE:DRUGSUPPLIERCODE,shopname:shopname}
	if (recordhistory == null) //用户没有浏览过商品
	{
		var recorddata = "{\"name\":\"" + name + "\",\"price\":\"" + price + "\",\"img\":\"" + img + "\",\"drugcode\":\"" + drugcode + "\",\"DRUGSUPPLIERCODE\":\"" + DRUGSUPPLIERCODE + "\",\"shopname\":\"" + shopname + "\",\"dddd\":\"" + dddd + "\"}";
		var record = "{\"userid\":\"" + userid + "\",\"data\":[" + recorddata + "]}";
		localStorage.setItem("record_" + userid, record);
	} else {
		if (recordhistory.indexOf(dddd) > 0) //已经浏览过改商品
		{} else {
			var recorddata = "{\"name\":\"" + name + "\",\"price\":\"" + price + "\",\"img\":\"" + img + "\",\"drugcode\":\"" + drugcode + "\",\"DRUGSUPPLIERCODE\":\"" + DRUGSUPPLIERCODE + "\",\"shopname\":\"" + shopname + "\",\"dddd\":\"" + dddd + "\"}";
			//添加用户浏览记录
			recordhistory = JSON.parse(recordhistory).data;
			if (recordhistory.length < 20) {
				for (var i in recordhistory) {
					recorddata = recorddata + "," + JSON.stringify(recordhistory[i]);
				}
				var record = "{\"userid\":\"" + userid + "\",\"data\":[" + recorddata + "]}";
				localStorage.setItem("record_" + userid, record);
			} else if (recordhistory.length >= 20) {
				for (var i in recordhistory) {
					if (i < 19) {
						recorddata = recorddata + "," + JSON.stringify(recordhistory[i]);
					}
				}
				var record = "{\"userid\":\"" + userid + "\",\"data\":[" + recorddata + "]}";
				localStorage.setItem("record_" + userid, record);
			}
		}
	}
}
//时间转换，毫秒数转换yyyy-mm-dd hh:mm:ss
function msTodate(ms) {
	ms = Number(ms);
	var time = new Date(ms);
	return getNowTime(time);
}
//时间转换，毫秒数转换yyyy-mm-dd hh:mm:ss
function msTodate3(ms) {
	ms = Number(ms) * 1000;
	var time = new Date(ms);
	return getNowTime(time);
}
//时间转换，毫秒数转换yyyy-mm-dd
function msTodate2(ms) {
	ms = Number(ms) * 1000;
	var time = new Date(ms);
	return getNowTime1(time);
}
//毫秒数转换为时间，本日hh:mm:ss;本年 mm-dd hh:mm:ss;其他年份yyyy-mm-dd hh:mm:ss
function msTodate1(ms) {
	ms = Number(ms);
	var time = new Date(ms);
	var nowTime = new Date();
	if (time.getFullYear() == nowTime.getFullYear()) {
		if (time.toDateString() == nowTime.toDateString()) {
			return dateValid(time.getHours()) + ":" + dateValid(time.getMinutes()) + ":" + dateValid(time.getSeconds());
		} else {
			return dateValid(time.getMonth() + 1) + "-" + dateValid(time.getDate()) + " " + dateValid(time.getHours()) + ":" + dateValid(time.getMinutes()) + ":" + dateValid(time.getSeconds());
		}
	} else {
		getNowTime(time);
	}
	return getNowTime(time);
}
//js获取当前时间，格式yyyy-mm-dd hh:mm:ss
function getNowTime(md) {
	if (!md) {
		md = new Date();
	}
	return md.getFullYear() + "-" + dateValid(md.getMonth() + 1) + "-" + dateValid(md.getDate()) + " " + dateValid(md.getHours()) + ":" + dateValid(md.getMinutes()) + ":" + dateValid(md.getSeconds());
}
//js获取当前时间，格式yyyy.mm.dd
function getNowTime1(md) {
	if (!md) {
		md = new Date();
	}
	return md.getFullYear() + "." + dateValid(md.getMonth() + 1) + "." + dateValid(md.getDate());
}

function dateValid(num) {
	return num > 9 ? num.toString() : ('0' + num.toString());
}
//订单状态转换
function orderStatusSwitch(no) {
	var status = "";
	switch (no) {
		case 0:
			status = "等待付款";
			break;
		case 1:
			status = "等待发货";
			break;
		case 2:
			status = "等待收货";
			break;
		case 3:
			status = "交易成功";
			break;
		case 4:
			status = "未评价";
			break;
		case 5:
			status = "已评价";
			break;
		case 6:
			status = "部分支付";
			break;
		case 7:
			status = "申请退货等待卖家同意";
			break;
		case 8:
			status = "卖家已同意等待退货";
			break;
		case 9:
			status = "已退货等待卖家退款";
			break;
		case 10:
			status = "退货被拒绝，待评价";
			break;
		case 11:
			status = "退货被拒绝，已评价";
			break;
		case 12:
			status = "不可退款，待评价";
			break;
		case 13:
			status = "不可退款，已评价";
			break;
		case 14:
			status = "已退款，待评价";
			break;
		case 15:
			status = "已退款，已评价";
			break;
		default:
			break;
	}
	return status;
}
//公共提示框
window.alert = function(msg, callback) {
	divShow({
		strTitle: '在线医药',
		tip: msg,
		icon: '',
		callback: callback
	});
}
window.alert1 = function(msg, callback) {
	divShow1({
		strTitle: '在线医药',
		tip: msg,
		icon: '',
		callback: callback
	});
}
window.confirm = function(msg, callback1, callback2) {
	divShow({
		strTitle: '在线医药',
		tip: msg,
		icon: '',
		type: 'confirm',
		confirmCallback: callback1,
		callback: callback2
	});
}
window.toast = function(msg, closeTime) {
	autoDivShow({
		msg: msg,
		closeTime: closeTime, //时间单位s
	});
}
//toast框，自动消失
var adsIndex = 0;
function autoDivShow(opts) {
	var msg = opts.msg,
		time = Number(opts.closeTime) || 5;
	//移除其他提示消息
	$(".autoDSMsg").remove();
	var autoDivShow = '<div class="autoDSMsg autoDSMsg_' + adsIndex + '">' + msg + '</div>';
	$('body').append(autoDivShow);
	var w = ($(window).width() - $(".autoDSMsg").width() - 20) / 2;
	//	var h = ($(window).height() - $(".autoDSMsg").height()) / 2;
	$(".autoDSMsg").css({
		//		'top': h,
		'left': w
	});
	$(".autoDSMsg").fadeIn();
	setTimeout('$(".autoDSMsg_' + adsIndex + '").fadeOut().remove();', time * 1000);
	adsIndex++;
}
function divShow1(opts) {
	var tip = opts.tip.toString(),
		icon = opts.icon,
		callback = opts.callback;
	//类型，confirm表示confirm,其他表示alert
	var type = opts.type;
	var basePath = "..";
	//判斷是否有msgDiv
	var msgDiv = document.getElementById("dialogMsgDiv");
	if (msgDiv) {
		document.body.removeChild(msgDiv);
	};
	//判斷是否有bgDiv
	var bgDiv = document.getElementById("dialogBgDiv");
	if (bgDiv) {
		document.body.removeChild(bgDiv);
	};

	var bgWidth = document.body.offsetWidth;
	var bgHeight = document.body.offsetHeight;

	//背景div
	bgDiv = document.createElement("div");
	bgDiv.setAttribute("id", "dialogBgDiv");
	bgDiv.className = "dialogBgDiv";
	document.body.appendChild(bgDiv);

	//msg對話框                                                    
	var msgDiv = document.createElement("div");
	msgDiv.setAttribute("id", "dialogMsgDiv");
	msgDiv.setAttribute("align", "center");
	msgDiv.className = "dialogMsgDiv";

	//計算msg對話框大小
	var fontSize = 12;
	var lineWidth = $(window).width() * 0.7;
	var dialogWidth = 280;
	var dialogHeight = 180;
	if (fontSize * tip.length < lineWidth) {
		dialogWidth = parseInt(fontSize * tip.length) + 50;
	} else {
		dialogWidth = parseInt(lineWidth);
		dialogHeight += parseInt(((fontSize * tip.length) / lineWidth) * fontSize);
	}
	if (dialogWidth < 280) {
		dialogWidth = 280;
	}
	msgDiv.style.width = dialogWidth + "px";
	msgDiv.style.height = dialogHeight + "px";
	var left = ($(window).width() - dialogWidth) / 2;
	var top = ($(window).height() - dialogHeight) / 2;
	msgDiv.style.left = left + "px";
	msgDiv.style.top = top + "px";

	//標題
	var title = document.createElement("div");
	title.setAttribute("id", "dialogTitle");
	title.setAttribute("align", "right");
	title.className = "dialogTitle";
	title.title = '关闭';
	//	title.innerHTML = "<table border='0' width='100%' height='100%'><tr><td align='left' style='border:none;'>" + opts.strTitle + "</td><td align='right' style='border:none;'><span style='cursor:pointer'><img src='" + basePath + "/images/close.png'></img></span></td></tr></table>";
	title.innerHTML = "<table border='0' width='100%' height='100%'><tr><td align='left' style='border:none;'>" + opts.strTitle + "</td><td align='right' style='border:none;'></td></tr></table>";

	document.body.appendChild(msgDiv);
	document.getElementById("dialogMsgDiv").appendChild(title);

	//展示對話框內容
	var txt = document.createElement("div");
	txt.setAttribute("id", "dialogMsgTxt");
	txt.className = "dialogTxt";
	var txtHeight = dialogHeight - 30 + "px";
	//	var txtHeight = dialogHeight - 50 + "px";
	//	if(type){
	//		txtHeight = dialogHeight - 30 + "px";
	//	}
	txt.style.height = txtHeight;
	var txtHTML = "";
	if (icon) {
		if (icon == "failed") {
			txtHTML = "<div style='width:" + dialogWidth + "px;height:" + txtHeight + ";word-break: break-all;word-wrap: break-word;'><div style='text-align:left;height:68%;width:84%;margin-left:8%;color:#565656;'><div class='vAlign'><img src='" + basePath + "/images/alert.png' style='margin-right:5px;'/>" + tip +
				"</div></div><div style='text-align:center;width:100%;height:32%;'>";
		} else if (icon == "success") {
			txtHTML = "<div style='width:" + dialogWidth + "px;height:" + txtHeight + ";word-break: break-all;word-wrap: break-word;'><div style='text-align:left;height:68%;width:84%;margin-left:8%;color:#565656;'><div class='vAlign'><img src='" + basePath + "/images/success.png' style='margin-right:5px;'/>" + tip +
				"</div></div><div style='text-align:center;width:100%;height:32%;'>";
		}
	} else {
		txtHTML = "<div style='width:" + dialogWidth + "px;height:" + txtHeight + ";word-break: break-all;word-wrap: break-word; '><div style='text-align:left;height:68%;width:84%;margin-left:8%;color:#565656;'><div class='vAlign'>" + tip +
			"</div></div><div style='text-align:center;width:100%;height:32%;'>";
	}
	if (type) {
		txtHTML += "<button id='dialogConfirmButton' class='dialogButton' type='button' style='border-right:1px solid #d2d2d2;'>确定</button><button id='dialogCloseButton' class='dialogButton' type='button'>取消</button>";
	} else {
		txtHTML += "<button id='dialogCloseButton' class='dialogCloseButton' type='button'>确定</button>";
	}
	txtHTML += "</div></div>";
	txt.innerHTML = txtHTML;
	document.getElementById("dialogMsgDiv").appendChild(txt);
	//點擊標題關閉和關閉按鈕
	var closeAll = document.getElementById("dialogTitle");
	var closeButton = document.getElementById("dialogCloseButton");
	var closeWin = function() {
		document.body.removeChild(bgDiv);
		document.getElementById("dialogMsgDiv").removeChild(title);
		document.body.removeChild(msgDiv);
		//$("body").unbind("keydown");
		if (callback) {
			callback();
		}
	};
	//	closeAll.onclick = closeWin;
	closeButton.onclick = closeWin;
	if (type) {
		var confirmButton = document.getElementById("dialogConfirmButton");
		confirmButton.onclick = function() {
			document.body.removeChild(bgDiv);
			document.getElementById("dialogMsgDiv").removeChild(title);
			document.body.removeChild(msgDiv);
			var confirmCallback = opts.confirmCallback;
			if (confirmCallback) {
				confirmCallback();
			}
		};
	}
	bgDiv.style.visibility = "visible";
	setTimeout("document.getElementById('dialogCloseButton').focus()", 100);
}
//弹框、确认框
function divShow(opts) {
	var tip = opts.tip.toString(),
		icon = opts.icon,
		callback = opts.callback;
	//类型，confirm表示confirm,其他表示alert
	var type = opts.type;
	var basePath = "..";
	//判斷是否有msgDiv
	var msgDiv = document.getElementById("dialogMsgDiv");
	if (msgDiv) {
		document.body.removeChild(msgDiv);
	};
	//判斷是否有bgDiv
	var bgDiv = document.getElementById("dialogBgDiv");
	if (bgDiv) {
		document.body.removeChild(bgDiv);
	};

	var bgWidth = document.body.offsetWidth;
	var bgHeight = document.body.offsetHeight;

	//背景div
	bgDiv = document.createElement("div");
	bgDiv.setAttribute("id", "dialogBgDiv");
	bgDiv.className = "dialogBgDiv";
	document.body.appendChild(bgDiv);

	//msg對話框                                                    
	var msgDiv = document.createElement("div");
	msgDiv.setAttribute("id", "dialogMsgDiv");
	msgDiv.setAttribute("align", "center");
	msgDiv.className = "dialogMsgDiv";

	//計算msg對話框大小
	var fontSize = 12;
	var lineWidth = $(window).width() * 0.7;
	var dialogWidth = 280;
	var dialogHeight = 180;
	if (fontSize * tip.length < lineWidth) {
		dialogWidth = parseInt(fontSize * tip.length) + 50;
	} else {
		dialogWidth = parseInt(lineWidth);
		dialogHeight += parseInt(((fontSize * tip.length) / lineWidth) * fontSize);
	}
	if (dialogWidth < 280) {
		dialogWidth = 280;
	}
	msgDiv.style.width = dialogWidth + "px";
	msgDiv.style.height = dialogHeight + "px";
	var left = ($(window).width() - dialogWidth) / 2;
	var top = ($(window).height() - dialogHeight) / 2;
	msgDiv.style.left = left + "px";
	msgDiv.style.top = top + "px";

	//標題
	var title = document.createElement("div");
	title.setAttribute("id", "dialogTitle");
	title.setAttribute("align", "right");
	title.className = "dialogTitle";
	title.title = '关闭';
	//	title.innerHTML = "<table border='0' width='100%' height='100%'><tr><td align='left' style='border:none;'>" + opts.strTitle + "</td><td align='right' style='border:none;'><span style='cursor:pointer'><img src='" + basePath + "/images/close.png'></img></span></td></tr></table>";
	title.innerHTML = "<table border='0' width='100%' height='100%'><tr><td align='left' style='border:none;'>" + opts.strTitle + "</td><td align='right' style='border:none;'></td></tr></table>";

	document.body.appendChild(msgDiv);
	document.getElementById("dialogMsgDiv").appendChild(title);

	//展示對話框內容
	var txt = document.createElement("div");
	txt.setAttribute("id", "dialogMsgTxt");
	txt.className = "dialogTxt";
	var txtHeight = dialogHeight - 30 + "px";
	//	var txtHeight = dialogHeight - 50 + "px";
	//	if(type){
	//		txtHeight = dialogHeight - 30 + "px";
	//	}
	txt.style.height = txtHeight;
	var txtHTML = "";
	if (icon) {
		if (icon == "failed") {
			txtHTML = "<div style='width:" + dialogWidth + "px;height:" + txtHeight + ";word-break: break-all;word-wrap: break-word;'><div style='text-align:center;height:68%;width:100%;color:#565656;'><div class='vAlign'><img src='" + basePath + "/images/alert.png' style='margin-right:5px;'/>" + tip +
				"</div></div><div style='text-align:center;width:100%;height:32%;'>";
		} else if (icon == "success") {
			txtHTML = "<div style='width:" + dialogWidth + "px;height:" + txtHeight + ";word-break: break-all;word-wrap: break-word;'><div style='text-align:center;height:68%;width:100%;color:#565656;'><div class='vAlign'><img src='" + basePath + "/images/success.png' style='margin-right:5px;'/>" + tip +
				"</div></div><div style='text-align:center;width:100%;height:32%;'>";
		}
	} else {
		txtHTML = "<div style='width:" + dialogWidth + "px;height:" + txtHeight + ";word-break: break-all;word-wrap: break-word;'><div style='text-align:center;height:68%;width:100%;color:#565656;'><div class='vAlign'>" + tip +
			"</div></div><div style='text-align:center;width:100%;height:32%;'>";
	}
	if (type) {
		txtHTML += "<button id='dialogConfirmButton' class='dialogButton' type='button' style='border-right:1px solid #d2d2d2;'>确定</button><button id='dialogCloseButton' class='dialogButton' type='button'>取消</button>";
	} else {
		txtHTML += "<button id='dialogCloseButton' class='dialogCloseButton' type='button'>确定</button>";
	}
	txtHTML += "</div></div>";
	txt.innerHTML = txtHTML;
	document.getElementById("dialogMsgDiv").appendChild(txt);
	//點擊標題關閉和關閉按鈕
	var closeAll = document.getElementById("dialogTitle");
	var closeButton = document.getElementById("dialogCloseButton");
	var closeWin = function() {
		document.body.removeChild(bgDiv);
		document.getElementById("dialogMsgDiv").removeChild(title);
		document.body.removeChild(msgDiv);
		//$("body").unbind("keydown");
		if (callback) {
			callback();
		}
	};
	//	closeAll.onclick = closeWin;
	closeButton.onclick = closeWin;
	if (type) {
		var confirmButton = document.getElementById("dialogConfirmButton");
		confirmButton.onclick = function() {
			document.body.removeChild(bgDiv);
			document.getElementById("dialogMsgDiv").removeChild(title);
			document.body.removeChild(msgDiv);
			var confirmCallback = opts.confirmCallback;
			if (confirmCallback) {
				confirmCallback();
			}
		};
	}
	bgDiv.style.visibility = "visible";
	setTimeout("document.getElementById('dialogCloseButton').focus()", 100);
}