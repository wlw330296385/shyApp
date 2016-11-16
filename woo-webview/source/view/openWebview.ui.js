/**
 * related to openWebview.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-20
 */
var app,page,debug;
debug = sm("do_Notification");
app = sm('do_App');
page = sm('do_Page');
do_WebView_1 = ui('do_WebView_1');
ui('do_ALayout_1').on('touch',function(){
	app.closePage();
})

page.on('loaded',function(){
	var url = page.getData();
	debug.alert('网址是:'+url);
	do_WebView_1.url = url;
})