ui("$").setMapping({ 
	"name.text" : "name" ,
	"do_ListView_1.tag":"status"
	});
var http = mm('do_Http');
var core = require('do/core');
var datas,status,kess,token;
var p = 1;
var device = sm("do_Device");
var deviceInfo = device.getInfo()
var storage,userInfo,algorithm;
algorithm = sm('do_Algorithm');
storage = sm('do_Storage');
userInfo = storage.readFileSync('data://userInfo',true);
kess = require('kess');
	if(userInfo.code == 1){
		token = kess.lockIt(userInfo.data.id);
	}else{
		core.toast("请先登录");
	}
var listData = mm('do_ListData');
var do_ListView_1 = ui('do_ListView_1');
do_ListView_1.bindItems(listData);
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
	http.url = "http://api.e-shy.com/index.php/index/order/index/token/"+token;
	http.method = "POST";
	http.contentType = "application/json";
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