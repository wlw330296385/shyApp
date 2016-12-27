/**
 * related to myPromote.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-12-09
 */
var app,page,core,http,token,storage,userInfo,kess,listData,p;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
http = mm('do_Http');
storage = sm('do_Storage');
kess = require('kess');
listData = mm('do_ListData');
http.method = "post";
//http.contentType = "application/app";
page.on('loaded',function(){
	userInfo = storage.readFileSync('data://userInfo',true);
	token = kess.lockIt(userInfo.data.id);
	http.url = "http://api.e-shy.com/index.php/index/member/referers/token/"+token;
	ui('do_ListView_1').bindItems(listData);
	http.form();
})

page.on('resume',function(){
//	ui('do_ListView_1').refreshItems();
	userInfo = storage.readFileSync('data://userInfo',true);
	token = kess.lockIt(userInfo.data.id);
	http.url = "http://api.e-shy.com/index.php/index/member/referers/token/"+token;
})
ui('do_ListView_1').on('pull',function(data){
	if(data.state == 2){
		listData.removeAll();
		listData.refreshData();
		ui('do_ListView_1').refreshItems();
		http.form({'text':[{'text':'p','value':'1'}]});
		ui('do_ListView_1').rebound();
	}
})

ui('do_ListView_1').on('push',function(data){
	if(data.state == 2){
		p++;
		listData.removeAll();
		listData.refreshData();
		ui('do_ListView_1').refreshItems();
		http.form({'text':[{'text':'p','value':p}]});
		ui('do_ListView_1').rebound();
	}
})

http.on('success',function(result){
	if(result.code == 1){	
		ui('do_Label_2').text = '共收到('+result.data.count+')个红包';
		ui('do_Label_3').text = result.data.totalAmount;
		listData.addData(result.data.referinfo);
		core.p(result.data.referinfo,'hongbaodata');
		ui('do_ListView_1').refreshItems();
		ui('do_ListView_1').rebound();
	}else{
		core.toast(result.msg);
		
	}
})

http.on('fail',function(result){
	core.toast(result.message);
	core.p(result);
})






//安卓返回键
page.on('back',function(){
	app.closePage();
})
ui('do_Button_1').on('touch',function(){
	app.closePage();
})