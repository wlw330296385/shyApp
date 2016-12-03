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
http.url = "http://192.168.0.240:8099/index.php/index/user/register/";
http.on('success',function(result){
	if(result.code == 1){
		core.toast(result.msg);
		storage.writeFile('data://userInfo',result,true,function(res){	
			if(res){
				core.toast('注册成功');
				app.closePage('reg','slide_t2b',2);
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
var pages = [
             {id:'step1',path:'source://view/reg/reg1.ui'},
             {id:'step2',path:'source://view/reg/reg2.ui'},
             ];
viewShower.addViews(pages);
viewShower.showView('step1','slide_b2t');


var mobile,password,password2,username;
page.on('step1',function(data){
	core.p(data,'step1-data');
	mobile = data;
	username = data;
	viewShower.showView('step2','slide_r2l');
})

page.on('step2',function(data){
	core.p(data,'step2-data');
	password = data.password;
	password2 = data.password2;
	referer = data.referer;
	http.body = {
			"password":password,
			"password2":password2,
			"username":username,
			"mobile":mobile,
			"referer":referer
	}
	core.p(http.body);
	http.request();
})

page.on('step3',function(){
	
})
var style=require("do/style");
style.css(ui('do_Button_1'));
//关闭注册
ui('do_Button_1').on('touch',function(){
	app.closePage('reg','slide_t2b',2);
})
page.on('back',function(){
	app.closePage('reg','slide_t2b',2);
})