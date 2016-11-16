//---------------------------------------------------------------
//封装页面中常用的函数
//version: 1.0.0
//---------------------------------------------------------------
var core=require("do/core");

//---------------------------------------------------------------
/**
 * 允许页面关闭，支持android的返回键关闭，IOS的滑动手势关闭
 * @param _buttons [可空] 指定可关闭功能的按钮，或者按钮列表；
 */
module.exports.allowClose = function(_buttons){
	var do_App = core.sm("do_App");
	var do_Page = core.sm("do_Page");
	//android返回按钮关闭页面;
	do_Page.on("back", "", 2000, function() {
		do_Page.hideKeyboard();
		do_App.closePage();
	});
	//ios手势关闭页面
	do_Page.supportPanClosePage({support:"true"});
	if (_buttons){
		if (typeof(_buttons) == "object" && !isNaN(_buttons.length)){
			for(var i =0; i< _buttons.length;i++){
				var _btn= _buttons[i];
				//1.5秒内连续点击只执行一次
				_btn.on("touch", "", 1500, function(data) {
					do_Page.hideKeyboard();
					do_App.closePage();
				});
			}
		}
		else{
			//1.5秒内连续点击只执行一次
			_buttons.on("touch", "", 1500, function(data) {
				do_Page.hideKeyboard();
				do_App.closePage();
			});
		}
	}
};

//---------------------------------------------------------------
/**
 * 允许页面退出应用，支持android的返回键退出
 * @param _buttons [可空] 指定可退出功能的按钮，或者按钮列表；
 */
module.exports.allowExit = function(_buttons){
	var do_App = core.sm("do_App");
	var do_Page = core.sm("do_Page");
	var startTime=0;

	do_Page.on("back", function(){
		//设置3秒内连续点击则退出
		if (startTime==0 || parseInt((new Date()).getTime()) - startTime > 3000) {
			var do_Notification=core.sm("do_Notification");
			do_Notification.toast("再次点击退出应用");
			startTime = parseInt((new Date()).getTime());
		} else {
			var do_Global = core.sm("do_Global");
			do_Global.exit();
		}
	});
	//按钮关闭应用
	if (_buttons){
		if (typeof _buttons == "object" && !isNaN(_buttons.length)){
			for(var i =0; i< _buttons.length;i++){
				var _btn= _buttons[i];
				//防止1.5秒之内的重复点击
				_btn.on("touch", "", 1500, function(data) {
					var do_Global = core.sm("do_Global");
					do_Global.exit();
				});
			}
		}
		else{
			//防止1.5秒之内的重复点击
			_buttons.on("touch", "", 1500, function(data) {
				var do_Global = core.sm("do_Global");
				do_Global.exit();
			});
		}
	}
};

//---------------------------------------------------------------
/**
 * 允许隐藏键盘 （点击最底层的空白处时，收起键盘）
 * @param _buttons [可空] 指定可隐藏键盘的按钮对象，或者按钮对象的列表；
 */
module.exports.allowHideKeyboard = function(_buttons){
	var do_Page = core.sm("do_Page");
	var _rootView = core.ui(__address);
	_rootView.on("touch", "", 1000, function(){
		do_Page.hideKeyboard();
	});
	//按钮关闭应用
	if (_buttons){
		if (typeof _buttons == "object" && !isNaN(_buttons.length)){
			for(var i =0; i< _buttons.length;i++){
				var _btn= _buttons[i];
				//防止1.5秒之内的重复点击
				_btn.on("touch", "", 1500, function(data) {
					do_Page.hideKeyboard();
				});
			}
		}
		else{
			//防止1.5秒之内的重复点击
			_buttons.on("touch", "", 1500, function(data) {
				do_Page.hideKeyboard();
			});
		}
	}
};

//---------------------------------------------------------------
/**
 * 指定的毫秒数后的回调
 * @param code 回调函数，或者要调用的函数或要执行的代码串
 * @param millisec 在执行代码前需等待的毫秒数
 */
module.exports.setTimeout = function(code, millisec){
	var _timer = core.mm("do_Timer");
	_timer.interval=999999;
	_timer.delay = millisec;
	_timer.on("tick", function(){
		_timer.stop();
		if (typeof(code)=="function"){
			code.call(this);
			return;
		}
		if (code && typeof(code) == "string" ){
			eval(code);
		}
	});
	_timer.start();
	return _timer;
};

//---------------------------------------------------------------
/**
 * 取消由 setTimeout() 方法设置的 timeout
 * @param id_of_settimeout 由 setTimeout() 返回的 ID 值。该值标识要取消的延迟执行代码块
 */
module.exports.clearTimeout = function(id_of_settimeout){
	if (!id_of_settimeout) return;
	id_of_settimeout.stop();
};

//---------------------------------------------------------------
/**
 * 按照指定的周期（以毫秒计）进行回调
 * @param code 回调函数，或者要调用的函数或要执行的代码串
 * @param millisec 重复执行代码周期的毫秒数
 */
module.exports.setInterval = function(code, millisec){
	var _timer = core.mm("do_Timer");
	_timer.interval=millisec;
	_timer.delay = millisec;
	_timer.on("tick", function(){
		if (typeof(code)=="function"){
			code.call(this);
			return;
		}
		if (code && typeof(code) == "string" ){
			eval(code);
		}
	});
	_timer.start();
	return _timer;
};

//---------------------------------------------------------------
/**
 * 取消由 setInterval() 设置的 timeout
 * @param id_of_setinterval 由 setInterval() 返回的 ID 值
 */
module.exports.clearTimeout = function(id_of_setinterval){
	if (!id_of_setinterval) return;
	id_of_setinterval.stop();
};