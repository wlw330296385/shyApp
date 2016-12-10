/**
 * related to dabo.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-10
 */

var app,page,core,webView,title,data,web,actiUrl;
web = ui('do_WebView_1');
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');

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
web.on('pull',function(state,offset){
	if(state == 2){
		web.reload();
		web.rebound();
	}
})