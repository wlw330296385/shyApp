/**
 * related to login1.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-29
 */
var app,page,core,storage,http;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');

page.on('loaded',function(){
	ui('do_TextField_1').on('focusOut',function(){
		if(this.text == ''){
			core.toast("用户名不能为空");
		}
	})
	ui('do_TextField_2').on('focusOut',function(){
		if(this.text == ''){
			core.toast("密码不能为空");
		}
	})
})

//通讯
http.method = "post";
http.contentType = "application/json";
http.on('success',function(result){
	if(result.code == 1){
		core.toast(result.msg);
		app.closePage();
	}else{
		core.toast(result.msg);
	}
})
http.url = "http://testapi.e-shy.com/index.php/index/user/login";
ui('do_Button_1').on('touch',function(){
	http.body = {
			"uername":ui('do_TextField_1').text,
			'password':ui('do_TextField_2').text
	}
	http.request();
})

//注册
ui('do_Button_3').on('touch',function(){
	app.openPage('source://view/reg/reg1.ui');
})
//忘记密码
ui('do_Button_2').on('touch',function(){
	app.openPage('source://view/reg/forget1.ui');
})
//返回
ui('do_ALayout_2').on('touch',function(){
	app.closePage();
})