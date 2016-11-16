/**
 * related to web.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-24
 */
var app,page,core,webView,title,data,web,actiUrl;
web = ui('do_WebView_1');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
var titleLabel = ui('do_Label_3');
ui('do_ALayout_3').on('touch','',1000,function(){
	if(web.url == actiUrl){
		app.closePage();
	}else{
		web.back();
	}
})

page.on('loaded',function(){
	data = page.getData();
	core.p(data,'page.getData');
	titleLabel.text = data.title;
	web.url = data.url;	
})

web.on('start',function(){
	web.eval("window.location.href", function(url, e) {
		actiUrl = url;
	})
})

web.on('loaded',function(){
	web.eval("window.location.href", function(url, e) {
		actiUrl = url;
		core.p(actiUrl,'web.load.actUrl');
	})
})

web.on('pull',function(){
	web.url ='';
	web.url = data.url;
	web.reload();
})

web.on('failed',function(){
	core.toast("页面加载失败,请下拉刷新或者关闭页面");
})

















//关闭页面
ui('do_ALayout_2').on('touch',function(){
	app.closePage();
})

page.on('back',function(){
	app.closePage();
})
//左右滑动不支持
page.supportPanClosePage({support:"false"});