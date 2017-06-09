function touchScale(dom){
	var _s = $(dom);
	var src = $(dom).attr("src");
	src = decodeURI(src);
	createLayer(src);
//	var content = "width=device-width, initial-scale=1, maximum-scale=2, minimum-scale=1, user-scalable=yes";
//	$("[name=viewport]").attr("content", content);
	$("#scaleLayer").slideDown();
}
//生成图片弹出层
function createLayer(src){
	var len = $("#scaleLayer").length;
	if(len > 0){
		return;
	}
	var elem = '<div id="scaleLayer" style="display:none;">' +
					'<div id="scaleBg"></div>' + 
					'<img src="' + src + '" />' + 
				'</div>';
	$("body").append(elem);
	$("#scaleLayer").click(function(e){
		e.preventDefault();
		closeLayer();
	});
//	$("#scaleLayer>img").click(function(e){
//		e.preventDefault();
//		e.stopPropagation();
//	});
}
//关闭图片弹出层
function closeLayer(){
//	$("#scaleLayer").dblclick();
//	var content = "width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no";
//	$("[name=viewport]").attr("content", content);
	$("#scaleLayer").remove();
}
