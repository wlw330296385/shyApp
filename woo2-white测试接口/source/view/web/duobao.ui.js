/**
 * related to duobao.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-16
 */
var app,page,core,web,style,actiUrl;
web = ui('do_WebView_1');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
style = require('do/style');
style.css([ui('do_Button_1')]);
ui('do_Button_1').on('touch','',1000,function(){
	if(web.url == actiUrl){
		app.closePage();
	}else{
		web.back();
	}
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

web.on('failed',function(){
	core.toast("页面加载失败,请下拉刷新或者关闭页面");
})