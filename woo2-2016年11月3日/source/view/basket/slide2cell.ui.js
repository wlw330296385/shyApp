ui("$").setMapping({ 
	"name.text" : "name" ,
	"do_ListView_1.tag":"status"
	});
var http = mm('do_Http');
var core = require('do/core');
var datas,status;
var p = 1;
var storage,userInfo;
storage = sm('do_Storage');
userInfo = storage.readFileSync('data://userInfo',true);
var listData = mm('do_ListData');
var do_ListView_1 = ui('do_ListView_1');
do_ListView_1.bindItems(listData);
http.url = "http://api.e-shy.com/index.php/index/order/index";
http.method = "POST";
http.contentType = "application/json";
http.setRequestHeader("Cookie", "PHPSESSID=" + userInfo.data.session_id);
http.on('success',function(data){
	core.p(data);
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
		core.alert("下拉刷新");
		listData.removeAll();
		p = 1;
		getData();
		this.rebound();	
	}
})

do_ListView_1.on('push',function(data){
	if(data.state == 2){
		core.alert("上拉加载");
		p++;
		getData();
		this.rebound();	
	}
})

function getData(){
//	core.alert("获取数据p="+p++);
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