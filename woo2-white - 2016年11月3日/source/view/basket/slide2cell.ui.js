ui("$").setMapping({ 
	"name.text" : "name" ,
	"do_ListView_1.tag":"status"
	});
var http = mm('do_Http');
var core = require('do/core');
var datas,status;
var p = 1;
var device = sm("do_Device");
var deviceInfo = device.getInfo()
var storage,userInfo;
storage = sm('do_Storage');
userInfo = storage.readFileSync('data://userInfo',true);
var listData = mm('do_ListData');
var do_ListView_1 = ui('do_ListView_1');
do_ListView_1.bindItems(listData);
//http.url = "http://192.168.1.104:9527/index.php/index/test";
//http.url = "http://192.168.1.167:8099/index.php/index/order";
http.url = "http://api.e-shy.com/index.php/index/order/index";
http.method = "POST";
http.contentType = "application/json";
http.setRequestHeader("Cookie", "PHPSESSID=" + userInfo.data.session_id);
http.on('success',function(data){
	if(data.code == 1){
		listData.addData(data.data);
		do_ListView_1.refreshItems();
	}else{
		core.toast(data.msg);
	}
})
http.on('fail',function(result){
	core.toast(result.message);
	core.p(result);
})
do_ListView_1.on('pull',function(data){	
	if(data.state == 2){
		listData.removeAll();
		do_ListView_1.refreshItems();
		p = 1;
		getData();
	}
	this.rebound();	
})

do_ListView_1.on('push',function(data){
	if(data.state == 2){
		p++;
		getData();
	}
	this.rebound();	
})

function getData(){
	http.body = {
			"status":status,
			"p":p
	}
	http.request();
}
ui("$").on('dataRefreshed',function(){
	status = do_ListView_1.tag;
	getData();
})

do_ListView_1.refreshItems();