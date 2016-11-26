/**
 * related to basket.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-03
 */
var app,page,core,storage,kess,token,algorithm;
app = sm('do_App');
page = sm('do_Page');
storage = sm('do_Storage');
core = require("do/core");
kess = require('kess');
algorithm = sm('do_Algorithm');
var listview = ui('do_ListView_1');
var listData = mm('do_ListData');
listview.bindItems(listData);
var http = mm('do_Http');
var orderData;
http.on('success',function(data){
	core.p(data);
	if(data.code == 1){
		orderData = data.data;
		listData.addData(orderData);
		listview.refreshItems();
	}
	if(data.code == 0){
		core.toast(data.msg);
	}
	if (data.code == -1) {
		core.alert(data.msg,'温馨提示',function(){
			app.openPage("source://view/login/login.ui");
		})
	}
	
});
http.on('fail',function(data){
	core.alert(data,'失败');
})

var p = 1;
http.contentType = "application/json";
page.on('getData',function(){
	if(p==1){
		listData.removeAll();
	}
	var userInfo = storage.readFileSync('data://userInfo',true);
	if(userInfo.code == 1){
		token = kess.lockIt(userInfo.data.id);
	}else{
		core.toast("请先登录");
	}
	http.method = "POST";
	// http.setRequestHeader("Cookie", "PHPSESSID=" + userInfo.data.session_id);

	http.body = {
			"p":p
	}
	http.url = "http://192.168.1.108:9999/index.php/index/order/index/token/"+token;
//	http.url = "http://api.e-shy.com/index.php/index/order/index";
	http.request();
})
//下拉刷新
listview.on('pull',function(data){
	p = 1;
	if (data.state !== 2) return;
	if (data.state == 2){
		page.fire('getData');
	}
    this.rebound();

});

listview.on('push',function(data){	
		p++;
	if (data.state !== 2) return;
	if (data.state == 2){
		page.fire('getData');
	}
	this.rebound();
})
page.fire('getData');
listview.refreshItems();

