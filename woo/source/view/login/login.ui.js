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
var debug = require('do/core');
login.on('touch',function(){
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
//			debug.p(typeof(postData));
			http.ajax({
				url:'http://192.168.1.167:8099/index.php/index/user/login',
				data:postData,
				type:'POST',
				contentType:'application/json',
//				contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
				success:function(userData){
					debug.p(userData);
					debug.p(userData.code);
					if(userData['code'] == 1){
						storage.writeFile('data://userInfo',userData,function(data){						
//						debug.print(JSON.stringify(data));	
						storage.readFile('data://userInfo',function(readData, e) {
							debug.p(11);	
						})
						notify.toast('登陆成功');
						progressBar.visible = false;
						login.animate(aniLoginNO);
						app.openPage('source://view/index/index.ui');
						})
					}else{
						notify.toast(userData.msg);
						progressBar.visible = false;
						login.animate(aniLoginNO);
						login.enabled =true;
						tf_1.enabled = true;
						tf_2.enabled = true;
					}
					},
				error:function(){
					notify.toast('登陆失败');
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
reg.on('touch',function(){
	app.openPage({source:'source://view/reg/reg.ui',id:'reg'});
	app.closePageToID("","","reg");
	page.hideKeyboard();
});
root_alayout.on('touch',function(){
	page.hideKeyboard();
})
//注册
var reg = ui('reg');
reg.on('touch',function(){
	app.openPage('source://view/reg/reg.ui');
})
