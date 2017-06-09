win = {};
//更改title
win.title = function(text){
    $$("title").innerHTML = text;
}
//初始化
win.init = function(){
    $("#header [goback]").on("click",function(){
        uexWindow.close(-1);
    })
    $("#header [openmore]").on("click",function(){
        win.openCenter();
    })
    $("[link]").on("click",win.showTab);
};
//显示tab
win.showTab = function(){
    if(!iG.checkAuthortization("content",$(this).attr("link"))){
        uexWindow.alert("提示","很抱歉，您没有相关权限！","确定");
        return;
    }
    $(this).siblings("[link]").removeClass("uhide");
    $(this).siblings("[checked]").addClass("uhide");
    $(this).addClass("uhide").prev().removeClass("uhide");
    var title = $(this).attr("title");
    if(title) $("#title").text(title);
    var link = $(this).attr("link");
    win.openPopover(link);
};
//触发tab
win.triggerTab = function(initPopover,appointPopover){
    var popover = !appointPopover ? initPopover : appointPopover;
    $("[link="+ popover +"]").trigger("click");
}
//打开浮层
win.openPopover = function(url){
    var content = window.getComputedStyle($$("content"),null);
    var inUrl = url + ".html";
    var inY = $$("header").offsetHeight;
    var inWidth = int(content.width);
    var inHeight = int(content.height);
    var inFontSize = int(content.fontSize);
    uexWindow.openPopover("content","0",inUrl,"",0,inY,inWidth,inHeight,inFontSize,"0");
};
//打开中心
win.openCenter = function(){
    var content = window.getComputedStyle($$("content"),null);
    var inUrl = "center.html";
    var inFontSize = int(content.fontSize);
    uexWindow.openPopover("center","0",inUrl,"",0,0,"","",inFontSize,"1");
}
//debug
if(window.navigator.platform=="Win32" && iG.debug){
    win.openPopover = function(url){
        location.replace(url + ".html");
    };
} 