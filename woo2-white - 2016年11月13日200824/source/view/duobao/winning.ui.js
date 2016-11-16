/**
 * related to winning.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-08
 */
var app,page,core,http,dataCache,listData,data;
app = sm('do_App');
page = sm('do_Page');
http = mm('do_Http');
dataCache = sm('do_DataCache');
core = require('do/core');
listData = mm('do_ListData');

ui('do_ALayout_6').on('touch',function(){
	app.closePage();
})

var do_ListView_1 = ui('do_ListView_1');
do_ListView_1.bindItems(listData);
//数据绑定
var p = 1;
http.url = "http://192.168.1.167:8099/index.php/index/panicbuy/index";
http.method = "POST";
http.contentType = "application/json";
http.on('success',function(result){
	core.p(result,'win');
	if(result.code == 6){
		listData.addData(result.data);
		dataCache.saveData("winData",result.data.data);
		do_ListView_1.refreshItems();
	}
});

http.on('fail',function(result){
	core.p(result.message)
})

http.body = {
	p:p,
	type:6
}
data = dataCache.loadData('winData');
if(data == undefined){
	p = 1;
	listData.removeAll();
	listData.refreshData();
	http.request();
	do_ListView_1.rebound();
}else{
	listData.addData(data);
	do_ListView_1.refreshItems();
}

//刷新数据
do_ListView_1.on('pull',function(data){
	if(data.state == 2){
		p = 1;
		listData.removeAll();
		listData.refreshData();
		http.request();
		do_ListView_1.rebound();
	}
})
do_ListView_1.on('push',function(data){
	if(data.state == 2){
		p++;
		http.request();
		do_ListView_1.rebound();
	}
})

ui('$').on('touch',function(){
	page.hideKeyboard();
})

//安卓返回键
page.on('back',function(){
	app.closePage();
})
