/**
 * related to reg1.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-29
 */
var app,page,core,storage,http;
var viewShower = ui('do_ViewShower_1');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
storage = sm('do_Storage');
http = mm('do_Http');
http.method = "post";
http.contentType = "application/json";
http.on('success',function(result){
	if(result.code == 1){
		core.toast(result.msg);
		storage.writeFile('data://userInfo',result,true,function(res){	
			if(res){
				core.toast('注册成功');
				app.closePage();
			}else{
				core.toast('存储失败，请检查手机权限');
				return false;
			}											
		})
	}else{
		core.toast(result.msg);
	}
})
http.on('fail',function(result){
	core.toast(result.message);
})
var pages = [{id:'step1',path:'source://view/reg/reg1.ui'},
             {id:'step2',path:'source://view/reg/reg2.ui'},
             ];
viewShower.addViews(pages);
viewShower.showView('step1');


var mobile,password,password2,username,sessionId;
page.on('step1',function(data){
	mobile = data.mobile;
	username = data.mobile;
	sessionId = data.sessionId;
	viewShower.showView('step2');
})

page.on('step2',function(data){
	password = data.password;
	password2 = data.password2;
	referer = data.referer;
	http.body = {
			"password":password,
			"password2":password2,
			"uername":username,
			"mobile":mobile,
			"refere":referer
	}
	http.setRequestHeader('cookie', "PHPSESSID="+sessionId)
	http.url = "http://testapi.e-shy.com/index.php/index/user/register/";
	http.request();
})

page.on('step3',function(){
	
})

//关闭注册
ui('do_Button_1').on('touch',function(){
	app.closePage();
})