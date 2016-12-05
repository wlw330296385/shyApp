/**
 * related to winning.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-08
 */
var app,page,core,listData,do_ListView_1,http,p=1,type=5,kess,token;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
kess = require('kess');
token = kess.lockIt(0);
listData = mm('do_ListData');
do_ListView_1 = ui('do_ListView_1');
http = mm('do_Http');
var data = [];
do_ListView_1.on('pull',function(data){
	if(data.state==2){
		p = 1;
		listData.removeAll();
		do_ListView_1.refreshItems();
		do_ListView_1.rebound();
		getData();
	}
})

do_ListView_1.on('push',function(data){
	if(data.state==2){
		p++;
		getData();
		do_ListView_1.refreshItems();
		do_ListView_1.rebound();
	}
})

http.url = "http://api.e-shy.com/index.php/index/panicbuy/index/token/"+token;
//http.url = "http://api.e-shy.com/index.php/index/panicbuy/index";
http.method ="POST";
http.contentType = "application/json";
http.on('success',function(result){
//	core.p(result.data,'返回的data');
	if (result.code == 5) {
		data = result.data;
		listData.addData(data);
		do_ListView_1.bindItems(listData);
		do_ListView_1.refreshItems();
	}else{
		core.toast(result.msg)
	}
	
});
http.on('fail',function(result){
	core.toast(result.message)
	core.p(result);;
})
function getData(){
	http.body ={
			p:p,
			type:type
	}
	http.request();
}


getData()
ui('do_ALayout_6').on('touch',function(){
	app.closePage();
})
ui('$').on('touch',function(){
	page.hideKeyboard();
})
//安卓返回键
page.on('back',function(){
	app.closePage();
})
