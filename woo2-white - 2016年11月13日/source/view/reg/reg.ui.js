/**
 * related to main.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-02
 */
var notify = sm("do_Notification");
var phoneBtn = ui('phoneBtn');
var time = mm('do_Timer');
var app = sm('do_App');
var page = sm('do_Page');
var alayout1= ui('do_ALayout_1');
var scrollView = ui('do_ScrollView_1');
var sessionID;
var username = ui('username'),
	password = ui('password'),
	password2 = ui('password2'),
	recPhone = ui('recPhone'),
	code = ui('code'),
	myPhone = ui('myPhone');
//通讯
var http = require('do/http');
var core = require('do/core');
var storage = sm('do_Storage');
//键盘
function keyBoardTo(offset){
	scrollView.scrollTo({'offset':offset});
}

myPhone.on('focusIn',function(){
	keyBoardTo(-400);
})
code.on('focusIn',function(){
	keyBoardTo(-400);
})
//登录
var toLogin = ui('toLogin');
toLogin.on('touch',function(msg){
	app.openPage('source://view/login/login.ui','login');
})
//倒计时&发送验证码
var phoneTime = 59;
phoneBtn.on('touch', "", 3000, function(){
	page.hideKeyboard();
	time.delay = 0;
	time.interval = 1000;
	if(!myPhone.text || myPhone.text == null || myPhone.text == undefined){
		notify.alert('手机号码不能为空');
		time.stop();
		return false;
	}
	if (!time.isStart()) {
		time.start();
	}else{
		notify.alert('请等待倒计时结束');
		return false;
	}
	
	http.ajax({
		url:"http://api.e-shy.com/index.php/index/user/sendRegisterCode",
//		url:"http://192.168.1.167:8099/index.php/index/user/sendRegisterCode",
		data:{'mobile':myPhone.text},
		type:'POST',
		contentType:'application/json',
		success: function(msg){	
//			core.p(msg,'code');
			if(msg.code == 1){
				notify.toast(msg.msg);
				sessionID = msg.data.session_id;
			}else{
				notify.toast(msg.msg);
				phoneBtn.enabled = true;
				phoneBtn.text = '重新验证码';
				time.stop();
			}
		},
		error: function(msg){
//			core.p(msg);
			notify.toast(msg);
			phoneBtn.text = '发送验证码';
            phoneBtn.enabled = true;
			time.stop();
		}
	});
});

time.on("tick", function(data, e) {
	phoneTime--;
	phoneBtn.enabled = false;
	phoneBtn.text = '发送验证码('+ phoneTime +')';
    if (phoneTime == 0) {
            phoneTime = 59;
            phoneBtn.text = '发送验证码';
            phoneBtn.enabled = true;
            time.stop();               
    }
});
//同意条款
ui('do_ALayout_2').on('touch',function(){
	app.openPage({
		source:"source://view/web/web.ui",
		data:JSON.stringify({title:"阅读条例",url:"http://mall.e-shy.com/protocal.html"}),
		animationType:'slide_b2t'});
})

//注册
var do_CheckBox_1 = ui('do_SwitchView_1');
var storage = sm('do_Storage');
var regOK = true;
var reg = ui('reg');
var http2 = mm('do_Http');
//http2.url = "http://192.168.1.167:8099/index.php/index/user/register";
http2.url = "http://api.e-shy.com/index.php/index/user/register";
http2.contentType = "application/json";
http2.method = "POST";
http2.on('success',function(userInfo){
	core.p(userInfo,'reg');
	if(userInfo.code == 1){
		storage.writeFile('data://userInfo',userInfo,true,function(res){	
			if(res){
				notify.toast('注册成功');
				app.openPage('source://view/index/index.ui','index');
			}else{
				notify.toast('写入失败');
				return false;
			}											
		})
	}else{
		core.p(userInfo,'regX')
		notify.alert(userInfo.msg);
	}
});
http2.on('fail',function(msg){
//	core.p(msg);
	notify.toast(msg.message);
});

reg.on('touch', "", 3000, function(){
	http2.setRequestHeader("Cookie","PHPSESSID="+sessionID);
	page.hideKeyboard();
	if(!username.text || username.text == null || username.text == undefined){
		notify.alert('用户名不能为空');
		regOK = false;
		return false;
	}else{
		regOK = true;
	}
	if(!password.text || password.text == null || password.text == undefined){
		notify.alert('密码不能为空');
		regOK = false;
		return false;
	}else{
		regOK = true;
	}
	if(!password2.text ||password2.text == null ||password2.text == undefined){
		notify.alert('重复密码不能为空');
		regOK = false;
		return false;
	}else{
		regOK = true;
	}
	if(password2.text!=password.text){
		notify.alert('两次密码不一样');
		regOK = false;
		return false;
	}else{
		regOK = true;
	}
	if(!myPhone.text|| myPhone.text == undefined || myPhone.text == null){
		notify.alert('手机号码不能为空');
		regOK = false;
		return false;
	}else{
		regOK = true;
	}
	if(!code.text|| code.text == undefined || code.text == null){
		notify.alert('验证码不能为空');
		regOK = false;
		return false;
	}else{
		regOK = true;
	}
	if(do_CheckBox_1.checked == false){
		notify.alert("请阅读并同意《深海油用户协议》");return false;
	}
	if(regOK == false){
		return false;
	}
	http2.body = {
			"username":username.text, 
			"password":password.text,
			"password2":password2.text,
			"mobile":myPhone.text,
			"referer":recPhone.text,
			"code":code.text
	};
	http2.request();
})
//隐藏键盘
alayout1.on('touch',function(){
	page.hideKeyboard();
})

page.on('back',function(){
	app.closePage("source://view/login/login.ui",'login');
})
		