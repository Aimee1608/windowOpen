(function(){
	// JavaScript Document
	//弹窗公共部分js，所有弹窗已经写好，调用时按照页面中注释方法使用即可
	var $oMasking;
	var $oWindowContainer;
	var $first = true;
	//打开弹窗方法
	$.extend({openWindow:function(setTitle,setContents,setButton,callback){

		//拼接弹窗内容，并且在调用打开弹窗方法时将内容塞进body
		var _html ='<div class="window-masking"></div>'+
		'<div class="window-container fix" id="addNew">'+
			'<h2></h2>'+
			'<div class="window-content">'+
				'<p class="window-text"></p>'+
			'</div>'+
			'<div class="window-btn fix">'+
				'<a class="cancel-button fl" href="javascript:;"></a>'+
				'<a class="confirm-button fr" href="javascript:;"></a>'+
				'<a class="ack-button fr" href="javascript:;"></a>'+
			'</div>'+
		'</div>';

		if($first){
			$first = false;
			var style = ".fix {zoom: 1;}"+
				".fix:after{ content: ''; height: 0; width: 0; clear: both; display:block; overflow: hidden;}"+
				".fl{float:left;}"+
				".fr{float: right;}"+
				".window-masking{width: 100%;height: 100%;background: #000;opacity: .5;position: fixed;top:0;left:0;bottom:0;right:0;z-index: 99;display: none;}"+
				".success,.window-container{width: 78%;background: #fff;position: fixed;top: 30%;left: 50%;margin-left:-39%;z-index: 100;border-radius: 4px;overflow: hidden;display: none;}"+
				".success .window-content,.window-container .window-content{padding: 20px 5%;border-bottom: 1px solid #bdbdbd;}"+
				".success p,.window-container .window-content p{margin:0;padding:0;font-size: 14px;color:#676767;line-height: 24px;text-align: center;}"+
				".window-btn a{text-decoration:none;display: block;height: 40px;width: 49%;text-align: center;line-height: 40px;font-size: 16px;font-weight: bold;color:#363636;display: none;}"+
				".window-btn a.cancel-button{border-right: 1px solid #bdbdbd;}"+
				".window-btn a.confirm-button{color:#d6a41f;}"+
				".window-container h2{margin:0;padding:0;text-align: center;font-size: 16px;font-weight: bold;color:#363636;padding-top: 22px;display: none;}"+
				".window-btn .ack-button{display: none;height: 40px;width: 100%;text-align: center;line-height: 40px;font-size: 16px;font-weight: bold;color:#d6a41f;;}"+
				".window-btn .ack-button:active{background: #d6a41f;color:#fff;}"+
				"@media only screen and (min-width: 568px) and (max-width: 1990px) {"+
				".success,.window-container{width:100%;left: 50%;margin-left:-250px;max-width: 500px;top:20%;}"+
				"}";
			$("<style></style>").text(style).appendTo($("head"));
		}

		//将拼接好的html塞进body里面
		$('body').append(_html);
		$oMasking = $('.window-masking');
		$oWindowContainer = $('.window-container');
		//点击取消按钮关闭弹窗
		$('.cancel-button,.window-masking,.ack-button,.confirm-button').on('click',function(e){
			 closeWindow();
			//console.log('点击确认框，回调',this);
			if(callback){
				callback($(this).html());
			}
		});
		//设置蒙版展示
		var modal = new Modal();
		// console.log(setButton+","+setContents+","+setButton)
		modal.setTitle(setTitle);
		modal.setContents(setContents);
				//设置按钮个数和链接
		modal.setButton(setButton);
		$oMasking.show();
		//设置弹窗面板展示
		$oWindowContainer.show();
	}});
	//关闭弹窗方法
	function closeWindow(){
		$oMasking = $('.window-masking');
		$oWindowContainer = $('.window-container');
		//关闭弹窗的时候将蒙版和html从页面中移除掉
		$oMasking.remove();
		$oWindowContainer.remove();
		return '确定';
	}
	//初始化
	var Modal = function () {
	    this.thismodal = $('#addNew');
	};
	//修改内容方法
	Modal.prototype = {
		setContents:function(obj){
			//找到需要修改内容的标签p，获取调用中设置的提示语
	    	this.thismodal.find('p.window-text').html(obj);
		},
		setTitle:function(obj){
			//找到需要修改的弹窗标题，获取调用中设置的弹窗标题
			if(obj!=""){
				this.thismodal.find('h2').show().html(obj);
			}

		},
		setButton: function (obj){
			//console.log('传过来的参数',obj);
		    //解析传过来的参数json
		    var json=eval(obj);
				 //console.log(json);

		    if(json.length==1){
		    	//一个按钮
		    	this.thismodal.find('a.ack-button').show().html(json[0]);
		    }
		    if(json.length==2){
		    	//两个按钮
		    	this.thismodal.find('a.cancel-button').show().html(json[0]);
		    	this.thismodal.find('a.confirm-button').show().html(json[1]);
		    }
		}
	}

})();
