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
toStep2.enabled = false;
//page.on('loaded',function(){
//	if(ui('do_TextField_1').text == ''){
//		core.toast('手机号码不能为空');
//	}
//	if(ui('do_TextField_2').text == ''){
//		core.toast('验证码不能为空');
//	}
//})

//点击获取验证码
http = mm('do_Http');
http.method = "post";
http.contentType = "application/json";
http.url = "http://testapi.e-shy.com/index.php/index/user/sendRegisterCode";
http.on('success',function(result){
	if(result.code == 1){
		toStep2.enabled = true;
		core.toast(result.msg);
	}else{
		phoneTime = 59;
		phoneBtn.text = '发送验证码';
        phoneBtn.enabled = true;
		core.toast(result.msg);
		time.stop();
	}
})
http.on('fail',function(result){
	core.toast(result.message);
	phoneTime = 59;
	phoneBtn.text = '发送验证码';
    phoneBtn.enabled = true;
	core.toast(result.msg);
	time.stop();
})
var time = mm('do_Timer');
var phoneTime = 59;
ui('do_Button_1').on('touch','',3000,function(){
	page.hideKeyboard();
	time.delay = 0;
	time.interval = 1000;
	if(ui('do_TextField_1').text == ''){
		core.alert('手机号码不能为空');
		time.stop();
		return false;
	}else{
		mobile = ui('do_TextField_1').text;
	}
	if (!time.isStart()) {
		time.start();
	}else{
		core.alert('请等待倒计时结束');
		return false;
	}
	http.body = {
			"mobile":ui('do_TextField_1').text
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
http2.url = "http://testapi.e-shy.com/index.php/index/user/checkVerify";
http2.on('success',function(result){
	if(result.code == 1){
		core.toast(result.msg);
		var data = {
				"mobile":mobile,
				"sessionId":result.data.sessionId
		}
		page.fire('step1',data);
	}else{
		core.toast(result.msg);
	}
});
http2.on('fail',function(result){
	core.toast(result.message);
})
toStep2.on('touch',function(){
	core.p(mobile)
	if(mobile == ''){
		core.toast('手机号码不能为空');
		return false;
	}
	if(ui('do_TextField_2').text == ''){
		core.toast('验证码不能为空');
		return false;
	}
	http.body = {
			"mobile":mobile,
			'code':ui('do_TextField_2').text
	}
	http.request();
})

