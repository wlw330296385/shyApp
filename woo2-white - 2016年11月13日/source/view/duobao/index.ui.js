/**
 * related to index.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-11-02
 */
var app,page,core,listData,do_ListView_1,http,p=1,type=3;
app = sm('do_App');
page = sm('do_Page');
core = require('do/core');
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

http.url = "http://192.168.1.109:9999/index.php/index/panicbuy/index";
//http.url = "http://api.e-shy.com/index.php/index/panicbuy/index";
http.method ="POST";
http.contentType = "application/json";
http.on('success',function(result){
//	core.p(result.data,'返回的data');
	if (result.code == 3) {
		data = result.data;
		core.p(data);
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
//	core.p(http.body,'提交的');
	http.request();
}

var action = 1;//表示热门
//新品上架
ui('do_ALayout_4').on('touch',function(){
	action = 2;
	newGoods();
	
})
function newGoods(){
	data.sort(function(x,y){
		return x.data.buycounts - y.data.buycounts;
	});
	listData.removeAll();
	listData.addData(data);
	listData.refreshData();
	do_ListView_1.refreshItems();
}

//热门推荐
ui('do_ALayout_2').on('touch',function(){
	action =1;
	hot();
})
function hot(){
	data.sort(function(x,y){
		return y.data.buycounts - x.data.buycounts;
	});
	listData.removeAll();
	listData.addData(data);
	listData.refreshData();
	do_ListView_1.refreshItems();
}
//最新揭晓
ui('do_ALayout_6').on('touch',function(){
	app.openPage("source://view/duobao/winning.ui");
})
//即将开讲
ui('do_ALayout_5').on('touch',function(){
	app.openPage("source://view/duobao/win_soon.ui");
})
getData();
listData.addData(data);
//listData.refreshData();
do_ListView_1.bindItems(listData);
do_ListView_1.refreshItems();
