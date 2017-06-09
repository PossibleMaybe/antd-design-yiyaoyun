/**
  * tabs jQuery Plugin
  * Author: Jin Lixiang
  * Version: 1.0
  * 
  * tabContainer: tab容器
//* tabTitle:tab标题列表存放容器
//* tabContent:tab内容存放容器
  * tabEvent:触发事件名
  * onStyle:菜单选中样式名
  * defaultTab: 默认打开第几个
  */
 ;(function($){
 	var defaults = {
 		tabContainer: '.tabs_container',
// 		tabTitle: 'tabs_title _container',
// 		tabContent: 'tabs_content_container',
 		tabEvent: 'click',
 		onStyle: 'tabs_current_tab',
 		defaultTab: 1
 	};
 	$.fn.tabs = function(options){
 		opts = $.extend({}, defaults, options);
 		return this.each(function(index){
// 			$(opts.tabContainer + ">ul").addClass('tab_title');
 			$(opts.tabContainer + ">div").addClass('table_content');
 			
 			var container = $(opts.tabContainer).eq(index);
 			if(!container) return;
 			var li = container.find(".tab_title>li");
 			setDefaultTab(container, li);
 		});
 		
 		function setDefaultTab(container, li){
 			var defaultTab = opts.defaultTab;
 			defaultTab > li.length ?　1 : defaultTab;
 			li.removeClass(opts.onStyle);
 			li.eq(defaultTab-1).addClass(opts.onStyle);
 			loadContent(container);
 			tabEvent(container, li);
 		}
 		
 		function loadContent(container){
 			var url = container.find("." + opts.onStyle).attr("tabs_url");
 			var calback = container.find("." + opts.onStyle).attr("tabs_calback");
 			$(".table_content", container).html("");
 			container.find(".table_content").load(url, function(){
 				eval(calback);
 			});
 		}
 		
 		function tabEvent(container, li){
 			li.each(function(){
 				var _self = this;
 				_self.addEventListener(opts.tabEvent, function(){
		 			li.removeClass(opts.onStyle);
		 			$(_self).addClass(opts.onStyle);
		 			loadContent(container);
 				}, false);
 			});
 		}
 	}
 })(jQuery);
