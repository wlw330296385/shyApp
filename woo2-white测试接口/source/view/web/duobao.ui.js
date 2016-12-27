/**
 * related to duobao.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-16
 */
var app,page,core,web,style,actiUrl,storage,token,kess,userInfo,urls;
web = ui('do_WebView_1');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');

storage = sm('do_Storage');
kess  = require('kess');
ui('do_Button_1').on('touch','',1000,function(){
	web.back();
})

ui('do_Button_2').on('touch','',1000,function(){
	web.reload();
})
userInfo = storage.readFileSync('data://userInfo',true);
if(userInfo.data){
	token = kess.lockIt(userInfo.data.id);
	urls = 'http://mall.e-shy.com/index/index/indexapp?token='+token
	web.url = urls;
}else{
	token = kess.lockIt(0);
	urls = 'http://mall.e-shy.com/index/index/indexapp?token='+token
	web.url = urls;
}
page.on('resume',function(){
	userInfo = storage.readFileSync('data://userInfo',true);
	if(!userInfo.data){
		return false;
	}
	token = kess.lockIt(userInfo.data.id);
	urls = 'http://mall.e-shy.com/index/index/indexapp?token='+token
	web.url = urls;
})
web.on('start',function(){

})
web.on('loaded',function(){
	web.eval("window.location.href", function(url, e) {
		actiUrl = url;
	})
})

web.on('pull',function(data){
	if(data.state == 2){
		web.url ='';
		web.url = actiUrl;
		web.reload();
		web.rebound();
	}
})

var style=require("do/style");
style.css([ui('do_Button_1'),ui('do_Button_2')]);

web.on('failed',function(){
	core.toast("页面加载失败,请下拉刷新");
})