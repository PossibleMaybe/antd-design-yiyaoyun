// QQ表情插件
(function($){  
	$.fn.qqFace = function(options){
		var defaults = {
			id : 'facebox',
			path : 'face/',
			assign : 'content',
			tip : 'em_',
			callback : null
		};
		var option = $.extend(defaults, options);
		var assign = $('#'+option.assign);
		var id = option.id;
		var path = option.path;
		var tip = option.tip;
		var callback = option.callback;
		
		if(assign.length<=0){
			alert('缺少表情赋值对象。');
			return false;
		}
		
		$(this).click(function(e){
			var len = $('#'+id).length;
			if(len > 0){
				var isHide = $('#'+id).css("display");
				isHide = isHide == "none";
				if(isHide){
					$('#'+id).show();
				} else {
					$('#'+id).hide();
				}
			}else{
				var strFace, labFace;
				//计算每排个数
				var _width = $("#chat_toolbar").width();
				var _num = parseInt(_width / 24);
				if($('#'+id).length<=0){
					strFace = '<div id="'+id+'" style="display:none;" class="qqFace">' +
								  '<table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;"><tr>';
					for(var i=1; i<=60; i++){
						labFace = '['+tip+i+']';
						strFace += '<td><img src="'+path+i+'.gif" onclick="$(\'#'+option.assign+'\').setCaret();$(\'#'+option.assign+'\').insertAtCaret(\'' + labFace + '\');" /></td>';
						if( i % _num == 0 ) strFace += '</tr><tr>';
					}
					strFace += '</tr></table></div>';
				}
				$(this).parent().append(strFace);
				$('#'+id).show();
			}
			//点击输入框，弹出输入法，隐藏表情
			$("#chat_textarea").click(function(){
				$('#'+id).hide();
				if(callback){
					//解决布局计算错误问题
					setTimeout('eval('+callback+')', 500);
				}
			});
//			$('#'+id).show();
			//表情框弹出，重新计算页面布局
			if(callback){
				//解决布局计算错误问题
				setTimeout('eval('+callback+')', 500);
			}
			e.stopPropagation();
		});
	};

})(jQuery);

jQuery.extend({ 
	unselectContents: function(){ 
		if(window.getSelection) {
			window.getSelection().removeAllRanges(); 
		} else if(document.selection){
			document.selection.empty();
		}
	} 
}); 
jQuery.fn.extend({ 
	selectContents: function(){ 
		$(this).each(function(i){ 
			var node = this; 
			var selection, range, doc, win; 
			if ((doc = node.ownerDocument) && (win = doc.defaultView) && typeof win.getSelection != 'undefined' && typeof doc.createRange != 'undefined' && (selection = window.getSelection()) && typeof selection.removeAllRanges != 'undefined'){ 
				range = doc.createRange(); 
				range.selectNode(node); 
				if(i == 0){ 
					selection.removeAllRanges(); 
				} 
				selection.addRange(range); 
			} else if (document.body && typeof document.body.createTextRange != 'undefined' && (range = document.body.createTextRange())){ 
				range.moveToElementText(node); 
				range.select(); 
			} 
		}); 
	}, 

	setCaret: function(){ 
		if(!$.browser.msie) return; 
		var initSetCaret = function(){ 
			var textObj = $(this).get(0); 
			textObj.caretPos = document.selection.createRange().duplicate(); 
		}; 
		$(this).click(initSetCaret).select(initSetCaret).keyup(initSetCaret); 
	}, 

	insertAtCaret: function(textFeildValue){ 
		var textObj = $(this).get(0); 
		if(document.all && textObj.createTextRange && textObj.caretPos){ 
			var caretPos=textObj.caretPos; 
			caretPos.text = caretPos.text.charAt(caretPos.text.length-1) == '' ? 
			textFeildValue+'' : textFeildValue; 
		} else if(textObj.setSelectionRange){ 
			var rangeStart=textObj.selectionStart; 
			var rangeEnd=textObj.selectionEnd; 
			var tempStr1=textObj.value.substring(0,rangeStart); 
			var tempStr2=textObj.value.substring(rangeEnd); 
			textObj.value=tempStr1+textFeildValue+tempStr2; 
//			textObj.focus(); 
			var len=textFeildValue.length; 
			textObj.setSelectionRange(rangeStart+len,rangeStart+len); 
			textObj.blur(); 
		}else{ 
			textObj.value+=textFeildValue; 
		} 
	} 
});