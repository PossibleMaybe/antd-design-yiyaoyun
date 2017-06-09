// JavaScript Document
function request(paras, s) {
    var url = location.href;
    if(url.indexOf("?") == -1){
    	return "";
    }
    var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
    var paraObj = {};
    for (i = 0; j = paraString[i]; i++) {
        paraObj[j.substring(0, j.indexOf("="))] = j.substring(j.indexOf("=") + 1, j.length);
    }
    var returnValue = paraObj[paras];
    //处理paras值，截取到字符s的位置
    if(returnValue && s){
    	var _i = returnValue.indexOf(s);
		if(_i != -1){
			returnValue = returnValue.substring(0, _i);
		}
    }
    if (typeof (returnValue) == "undefined") {
        return "";
    } else {
        return returnValue;
    }
}