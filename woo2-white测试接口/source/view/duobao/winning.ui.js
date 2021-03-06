/**
 * related to winning.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-08
 */
var app,page,core,http,dataCache,listData,data,token,kess;
app = sm('do_App');
page = sm('do_Page');
http = mm('do_Http');
dataCache = sm('do_DataCache');
core = require('do/core');
kess = require('kess');
token = kess.lockIt(0);
listData = mm('do_ListData');

ui('do_ALayout_6').on('touch',function(){
	app.closePage();
})
var do_ListView_1 = ui('do_ListView_1');
do_ListView_1.bindItems(listData);
//数据绑定
var p = 1;
http.url = "http://api.e-shy.com/index.php/index/panicbuy/index/token/"+token;
http.method = "POST";
http.contentType = "application/json";
http.on('success',function(result){
	if(result.code == 6){
		listData.addData(result.data);
		dataCache.saveData("winData",result.data.data);
		do_ListView_1.refreshItems();
	}else{
		core.toast(result.msg);
	}
});

http.on('fail',function(result){
	core.p(result.message)
})



//刷新数据
do_ListView_1.on('pull',function(data){
	if(data.state == 2){
		p = 1;
		http.body = {
				p:p,
				type:6
			}
		listData.removeAll();
		do_ListView_1.refreshItems();
		http.request();
		do_ListView_1.rebound();
	}
})
do_ListView_1.on('push',function(data){
	if(data.state == 2){
		p++;
		http.body = {
				p:p,
				type:6
			}
		http.request();
		do_ListView_1.rebound();
	}
})
ui('$').on('touch',function(){
	page.hideKeyboard();
})
//一开始获得数据
page.on('getCache',function(){
	if(!dataCache.hasData()){
		http.body = {
				p:p,
				type:6
			}
		http.request();
		do_ListView_1.rebound();
	}else{
		data = dataCache.loadData('winData');
		listData.addData(data);
		do_ListView_1.refreshItems();
	}
})

page.fire('getCache');
//安卓返回键
page.on('back',function(){
	app.closePage();
})
