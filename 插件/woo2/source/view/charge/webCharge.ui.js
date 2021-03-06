/**
 * related to webCharge.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-19
 */

var app,page,core,storage,userInfo,userId,actiUrl;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
storage = sm('do_Storage');
var web = ui('do_WebView_1');
var webBack = ui('do_ALayout_2');
var webClose = ui('do_ALayout_3');
var pro = ui('do_ProgressBar_1');
var param;
webBack.on('touch','',1000,function(){
	if(web.url == actiUrl){
		app.closePage();
	}else{
		web.back();
	}
})

webClose.on('touch',function(){
	app.closePage();
})

web.on('failed',function(){
	core.toast("页面加载失败,请下拉刷新或者关闭页面");
})

web.on('pull',function(state,offset){
	web.url ='';
	web.url = data.url;
	web.reload();
})

web.on('start',function(){
	pro.visible = true;
	web.eval("window.location.href", function(url, e) {
		actiUrl = url;
	})
})

web.on('loaded',function(){
	pro.visible = false;
	web.eval("window.location.href", function(url, e) {
		actiUrl = url;
	})
})

page.on('loaded',function(){
	userInfo = storage.readFileSync('data://userInfo');
	if (userInfo == '') {
		core.alert('请先登录',function(){
			app.openPage("source://view/login/login.ui");
		})
	}
	userId = userInfo.data.id;
//	web.url = "http://api.e-shy.com/index.php/index/charge/charge?userId="+userId;
	web.url = "http://api.e-shy.com/index.php/index/charge/charge?userId="+userId;
})
page.on('result',function(){
	userInfo = storage.readFileSync('data://userInfo');
	userId = userInfo.data.id;
	web.url = "http://api.e-shy.com/index.php/index/charge/charge?userId="+userId;
})
