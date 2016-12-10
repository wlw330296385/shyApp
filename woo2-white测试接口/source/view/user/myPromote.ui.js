/**
 * related to myPromote.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-09
 */
var app,page,core,http,token,storage,userInfo,kess,listData;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
http = mm('do_Http');
storage = sm('do_Storage');
kess = require('do/kess');
listData = mm('do_ListData');
http.method = "post";
http.contentType = "application/app";
page.on('loaded',function(){
	ui('do_ListView_1').bindItems(listData);
	http.request();
})

page.on('resume',function(){
	ui('do_ListView_1').refreshItems();
	userInfo = storage.readFileSync('data://userInfo',true);
	token = kess.lockIt(userInfo.data.id);
	http.url = "http://192.168.0.240:8099/index.php/index/member/referers/token/"+token;
})
ui('do_ListView_1').on('pull',function(data){
	if(data.state == 2){
		listData.removeAll();
		listData.refreshData();
		ui('do_ListView_1').refreshItems();
		http.request();
	}
})

http.on('success',function(result){
	if(result.code == 1){	
		listData.addData(result.data);
		ui('do_ListView_1').refreshItems();
		ui('do_ListView_1').rebound();
	}else{
		core.toast(result.msg);
		ui('do_ListView_1').rebound();
	}
})

http.on('fail',function(result){
	core.toast(result.message);
	core.p(result);
	ui('do_ListView_1').rebound();
})







ui('do_Button_1').on('touch',function(){
	app.closePage();
})