/**
 * related to sea.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-03
 */
var app,page;
app = sm('do_App');
page = sm('do_Page');
do_WebView_1 = ui('do_WebView_1');
page.on('loaded',function(){
	do_WebView_1.url = "http://mall.e-shy.com/";
})

do_WebView_1.on('pull',function(state,offset){
	do_WebView_1.url = '';
	if(state == 2){		
		do_WebView_1.url = "http://mall.e-shy.com/";
		do_WebView_1.reload();
	}
	do_WebView_1.rebound();
})

page.on('back',function(){
	
})

