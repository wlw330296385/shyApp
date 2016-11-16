/**
 * related to main.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-02
 */
var forget = ui("forget"),reg = ui('reg'),login = ui("login");
var app = sm('do_App');
var page = sm('do_Page');
var tf_1 = ui('tf_1');
var tf_2 = ui('tf_2');
var notify = sm("do_Notification");
var root_alayout = ui('root_alayout');
var buttonA = mm("do_Animation", "BUTTONTOUCHDOWNS", "app");
var loginOK = true;
var http = require('do/http');
//动画
var aniLoginOK = mm("do_Animator");
var propsLY = {width:0,x:310,bgColor:"FFFFFFFF"};
aniLoginOK.append(1000,propsLY,'EastOut');
var aniLoginNO = mm('do_Animator');
var propsLN = {width:620,x:65,bgColor:"FFFFFFFF",border: "FFFFFFFF,0,80"};
aniLoginNO.append(1000,propsLN);
var progressBar = ui('ProgressBar');
page.supportPanClosePage();
//存储
var storage = sm('do_Storage');
var userData = {};
//调试
var core = require('do/core');
login.on('touch', "", 3000, function(){
	login.animate(buttonA);
	if(tf_1.text == ''&&tf_2.text == ''){
		tf_1.setFocus(true);
		notify.toast('请输入帐号/密码');
		loginOK = false;
	}else if(tf_1.text == ''){
		tf_1.setFocus(true);
		notify.toast('请输入帐号');
		loginOK = false;
	}else if(tf_2.text == ''){
		notify.toast('请输入密码');
		tf_2.setFocus(true);
		loginOK = false;
	}else{
		if(loginOK = true){
			progressBar.visible = true;
			login.animate(aniLoginOK);
			login.enabled =false;
			tf_1.enabled = false;
			tf_2.enabled = false;
			postData = {'username':tf_1.text,'password':tf_2.text};
			http.ajax({
//				url:'http://api.e-shy.com/index.php/index/user/login',
//				url:'http://api.e-shy.com/index.php/index/user/login',
				url:'http://api.e-shy.com/index.php/index/user/login',
				data:postData,
				type:'POST',
				contentType:'application/json',
				success:function(userData){
					core.p(userData,'login');
					if(userData.code == 1){
						storage.writeFile('data://userInfo',userData,true,function(boo){	
						core.p(userData)
						notify.toast('登陆成功');
						progressBar.visible = false;
						login.animate(aniLoginNO);
						login.enabled =true;
						tf_1.enabled = true;
						tf_2.enabled = true;
						login.redraw();
						app.openPage('source://view/index/index.ui','index');
						})
					}else{
						notify.toast(userData.msg);
						core.p(userData)
						progressBar.visible = false;
						login.animate(aniLoginNO);
						login.enabled =true;
						tf_1.enabled = true;
						tf_2.enabled = true;
						login.redraw();
					}
					},
				error:function(errorInfo){
					progressBar.visible = false;
					login.animate(aniLoginNO);
					login.enabled =true;
					tf_1.enabled = true;
					tf_2.enabled = true;
					login.redraw();
					core.p(errorInfo);
					notify.toast(errorInfo);
				}
			})			
		}else{
			progressBar.visible = false;
			login.animate(aniLoginNO);
			login.enabled =true;
			tf_1.enabled = true;
			tf_2.enabled = true;
			notify.toast('未知错误登陆失败');
			login.redraw();
		};
	}
	
	page.hideKeyboard();
});
//注册
var reg = ui('reg');
reg.on('touch',function(){
	app.openPage({source:'source://view/reg/reg.ui',id:'reg'});
	page.hideKeyboard();
});
root_alayout.on('touch',function(){
	page.hideKeyboard();
})
//忘记密码
ui('forget').on('touch',function(){
	app.openPage("source://view/reg/forget.ui");
})

//暂不登录
ui('do_ALayout_9').on('touch',function(){
	app.openPage("source://view/index/index.ui");
})
//退出程序
var pagejs = require('do/page');
pagejs.allowExit();	

//左右滑动不支持
page.supportPanClosePage({support:"false"});
