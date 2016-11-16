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
var username = ui('username'),
	password = ui('password'),
	password2 = ui('password2'),
//	comboBox = ui('comboBox'),
//	zjhm = ui('zjhm'),
	recPhone = ui('recPhone'),
	phoneText = ui('phoneText'),
	myPhone = ui('myPhone');
//通讯
var http = require('do/http');
var core = require('do/core');
//键盘
function keyBoardTo(offset){
	scrollView.scrollTo({'offset':offset});
}

phoneText.on('touch',function(){
	keyBoardTo(-400);
})
//倒计时
var phoneTime = 59;
phoneBtn.on('touch',function(){
	time.delay = 0;
	time.interval = 1000;
	if (!time.isStart()) {
		time.start();
	}else{
		notify.alert('请等待倒计时结束');
	}
	if(!myPhone.text || myPhone.text == null){
		notify.alert('手机号码不能为空');
		return false;
	}
	core.p(myPhone.text);
	http.ajax({
		url:"http://192.168.1.167:8099/index.php/index/user/sendRegisterCode",
		data:{moblie:myPhone.text},
		type:'POST',
		contentType:'application/json',
		success: function(msg){
			if(msg.code == 1){
				notify.toast('短信验证码发送成功');
				time.stop();
			}else{
				notify.toast(msg.msg);
				phoneBtn.enabled = true;
				phoneBtn.text = '重新验证码';
				time.stop();
			}
		},
		error: function(msg){
			core.p(msg);
			notify.toast('未知错误');
			phoneBtn.text = '发送验证码';
            phoneBtn.enabled = true;
			time.stop();
		}
	});
	
	time.on("tick", function(data, e) {
		phoneBtn.enabled = false;
		phoneBtn.text = '发送验证码('+ phoneTime-- +')';
        if (phoneTime == 0) {
                phoneTime = 59;
                phoneBtn.text = '发送验证码';
                phoneBtn.enabled = true;
                time.stop();               
        }
	});
});



var reg = ui('reg');
reg.on('touch',function(){
	notify.toast('注册成功');	
	app.openPage({source:'source://view/login/login.ui',id:'index'});
//	app.closePage('','','index');
})


alayout1.on('touch',function(){
	page.hideKeyboard();
})