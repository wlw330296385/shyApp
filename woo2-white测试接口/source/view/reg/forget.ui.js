/**
 * related to getBackUser.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-22
 */
var app,page,core,http1,http2,time,sessionID;
time = mm('do_Timer');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
http1 = mm('do_Http');
http1.url = "http://192.168.0.240:8099/index.php/index/user/sendRegisterCode";
http1.method = "POST";
http1.contentType = "application/json";
//短信验证码
http1.on("success",function(result){
	if(result.code == 1){
		sessionID = result.data.session_id
		core.toast(result.msg);
	}else{
		core.toast(result.msg);
	}
	
})
http1.on('fail',function(result){
	core.toast(result.msg);
});
//忘记密码
http2 = mm('do_Http');
http2.url = "http://192.168.0.240:8099/index.php/index/user/forget";
http2.method = "POST";
http2.contentType = "application/json";
http2.on("success",function(result){
	if(result.code == 1){
		core.toast("修改成功");
		app.closePage();
	}else{
		core.alert(result.msg);
	}
	
})
http2.on('fail',function(result){
	core.toast(result.message);
})
var do_TextField_1 = ui('do_TextField_1'),  
	do_TextField_2 = ui('do_TextField_2'),
	do_TextField_3 = ui('do_TextField_3'),
	do_TextField_4 = ui('do_TextField_4'),
	do_Button_1 = ui('do_Button_1');

var phoneTime = 59;
do_Button_1.on('touch', "", 3000, function(){
	time.delay = 0;
	time.interval = 1000;
	if (!time.isStart()){
		time.start();
	}else{
		notify.alert('请等待倒计时结束');
		return false;
	}
	if(!do_TextField_1.text || do_TextField_1.text == null || do_TextField_1.text == undefined){
		notify.alert('账号不能为空');
		return false;
	}
	http1.body = {"username":do_TextField_1.text};
	http1.request();
});

time.on("tick", function(data, e) {
	do_Button_1.enabled = false;
	do_Button_1.text = '发送验证码('+ phoneTime-- +')';
    if (phoneTime == 0) {
            phoneTime = 59;
            do_Button_1.text = '发送验证码';
            do_Button_1.enabled = true;
            time.stop();               
    }
});
var device = sm("do_Device");
var deviceInfo = device.getInfo();
var nf = sm('do_Notification');
//提交
if(deviceInfo.OS!="android"){
	do_TextField_1.on('focusOut',function(){
	if(do_TextField_1.text == ''){
		nf.toast({text:"账号不能为空",y:120});
	}
	})
	do_TextField_2.on('focusOut',function(){
		if(do_TextField_2.text == ''){
			nf.toast({text:"密码不能为空",y:120});
		}
	})
	do_TextField_3.on('focusOut',function(){
		if(do_TextField_3.text == '' || do_TextField_2.text != do_TextField_3.text){
			nf.toast({text:"重复密码不能为空",y:120});
		}
	})
	
	do_TextField_4.on('focusOut',function(){
		if(do_TextField_4.text == ''){
			nf.toast({text:"两次密码不一致",y:120});
		}
	})
}
ui('do_Button_2').on('touch','',3000,function(){
	if(do_TextField_1.text == ''){
		nf.toast({text:"账号不能为空"});
		return false;
	}
	if(do_TextField_2.text == ''){
		nf.toast({text:"密码不能为空"});
		return false;
	}
	if(do_TextField_3.text == ''){
		nf.toast({text:"两次密码不一致"});
		return false;
	}
	if(do_TextField_4.text == ''){
		core.toast('验证码不能为空');
		return false;
	}

	http2.setRequestHeader("Cookie","PHPSESSID="+sessionID);
	http2.body = {
			"username":do_TextField_1.text,
			"password":do_TextField_2.text,
			"password2":do_TextField_3.text,
			"code":do_TextField_4.text
	}
	http2.request();
//	if(canNotSubmit){
//		http2.body = {
//			"username":do_TextField_1.text,
//			"password":do_TextField_2.text,
//			"password2":do_TextField_3.text,
//			"code":do_TextField_4.text
//		}
//		http2.request();
//	}else{
//		core.alert('输入的内容不对,请重新输入');
//	}
})

//隐藏键盘
ui('$').on('touch',function(){
	page.hideKeyboard();
})
page.on('back',function(){
	app.closePage();
})

ui('do_ALayout_2').on('touch',function(){
	app.closePage();
})
