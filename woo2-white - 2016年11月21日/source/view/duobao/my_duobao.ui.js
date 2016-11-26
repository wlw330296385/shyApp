/**
 * related to my_duobao.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-09
 */
var app,page,core,dataCache,http,listData,listView,p = 1,kess,stoarge,userInfo,token;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
dataCache = sm('do_DataCache');
http = mm('do_Http');
listData = mm('do_ListData');
listView = ui('do_ListView_1');
listView.bindItems(listData);
storage = sm('do_Storage');
kess = require('kess');
userInfo = storage.readFileSync("data://userInfo",true);
if(userInfo.code == 1){
	token = kess.lockIt(userInfo.data.id);
}else{
	core.toast('请先登录');
}

http.url = "http://api.e-shy.com/index.php/index/panicbuy/panicbuy_order/token/"+token;
http.method = "POST";
http.contentType = "application/json";
http.on('success',function(result){
	core.p(result,'duobaoOrder')
	if(result.code == 1){
		dataCache.saveData('my_duobao',result.data);
		listData.addData(result.data);
		listView.refreshItems();
	}else{
		core.toast(result.msg);
	}
})
http.on('fail',function(result){
	core.p(result);
	core.toast(result.message);
})
http.body = {
	p:p
}
http.request();

page.on('redrawCell',function(){
//	listView.refreshItems();
//	listData.refreshData();
})
page.on('loaded',function(){
	
//	listView.refreshItems();
})
//刷新数据
listView.on('pull',function(data){
	if(data.state == 2){
		listData.removeAll();
		listView.refreshItems();
		http.body = {
			p:1
		}
		http.request();
		listView.rebound();
	}
})
listView.on('push',function(data){
	if(data.state == 2){
		p++;
		http.body = {
				p:p
			}
		http.request();
		listView.rebound();
	}
})

//安卓返回键
page.on('back',function(){
	app.closePage();
})
ui('do_ALayout_1').on('touch',function(){
	app.closePage();
})