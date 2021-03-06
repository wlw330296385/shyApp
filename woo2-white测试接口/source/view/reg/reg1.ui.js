/**
 * related to reg1.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-29
 */

var app,page,core,http;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
var mobile;
var phoneBtn = ui('do_Button_1');
var toStep2 = ui('do_Button_2');

var istoStep2 = false;
//点击获取验证码
var sessionID;
http = mm('do_Http');
http.method = "post";
http.contentType = "application/json";
http.url = "http://api.e-shy.com/index.php/index/user/getRegisterCode";
http.on('success',function(result){
	core.p(result,'发送验证码');
	if(result.code == 1){
		istoStep2 = true;
		core.toast(result.msg);
		sessionID = result.data.session_id;
		http2.setRequestHeader("Cookie","PHPSESSID="+sessionID);
	}else{
		phoneTime = 59;
		phoneBtn.text = '发送验证码';
        phoneBtn.enabled = true;
		core.alert(result.msg);
		time.stop();
	}
})
http.on('fail',function(result){
	core.toast(result.message);
	phoneTime = 59;
	phoneBtn.text = '发送验证码';
    phoneBtn.enabled = true;
	time.stop();
})
var time = mm('do_Timer');
var phoneTime = 59;
ui('do_Button_1').on('touch','',3000,function(){
	page.hideKeyboard();
	time.delay = 0;
	time.interval = 1000;
	var myreg = /^1(3|4|5|6|7|8)[0-9]{9}/; 
	if(!myreg.test(ui('do_TextField_1').text )) { 
    	core. alert('请输入有效的手机号码！'); 
    	 phoneTime = 59;
    	 ui('do_Button_1').text = '发送验证码';
    	 ui('do_Button_1').enabled = true;
         time.stop();    
        return false; 
    }else {
		mobile = ui('do_TextField_1').text;
	}
	if (!time.isStart()) {
		time.start();
	}else{
		core.alert('请等待倒计时结束');
		return false;
	}
	http.body = {
			"mobile":mobile
	}
	http.request();
})
//倒计时控件
time.on("tick", function(data, e) {
	phoneTime--;
	phoneBtn.enabled = false;
	phoneBtn.text = '正在发送('+ phoneTime +')';
    if (phoneTime == 0) {
            phoneTime = 59;
            phoneBtn.text = '发送验证码';
            phoneBtn.enabled = true;
            time.stop();               
    }
});

//验证验证码
var http2 = mm('do_Http');
http2.method = "post";
http2.contentType = "application/json";
http2.url = "http://api.e-shy.com/index.php/index/user/checkVerify";
http2.on('success',function(result){
	core.p(result,'检查验证码');
	if(result.code == 1){
		core.toast(result.msg);
		page.fire('step1',mobile);
	}else{
		core.toast(result.msg);
	}
});
http2.on('fail',function(result){
	core.toast(result.message);
})
toStep2.on('touch',function(){
	if(!istoStep2){ 
		core.toast('请先获取验证码');;
		}
	if(mobile == ''){
		core.toast('手机号码不能为空');
		return false;
	}
	if(ui('do_TextField_2').text == ''){
		core.toast('验证码不能为空');
		return false;
	}
	http2.body = {
			"mobile":mobile,
			'code':ui('do_TextField_2').text
	}
	http2.request();
})
var style=require("do/style");
style.css([ui('do_Button_1'),ui('do_Button_2')]);
//隐藏键盘
ui('$').on('touch',function(){
	page.hideKeyboard();
})


