/**
 * related to basket.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-03
 */
var app,page,core,storage;
app = sm('do_App');
page = sm('do_Page');
storage = sm('do_Storage');
core = require("do/core");
var listview = ui('do_ListView_1');
var listData = mm('do_ListData');
listview.bindItems(listData);
var http = mm('do_Http');
var orderData;
//var orderData = [{
//	"order_type":'1',
//	"orderno":"201610171111",
//	"total_amount":"59.98",
//	"goods_info":"中石油油卡500元",
//	"goods_name":"中石油油卡",
//	"order_status":'1',
//	"create_time":"2016年10月18日16:40:55",
//	"goods_img":"source://image/SG.png"
//},{
//	"order_type":'1',
//	"orderno":"201610171111",
//	"total_amount":"59.98",
//	"goods_info":"中石油油卡500元",
//	"goods_name":"中石油油卡",
//	"order_status":'1',
//	"create_time":"2016年10月18日16:40:55",
//	"goods_img":"source://image/SG.png"
//},{
//	"order_type":'1',
//	"orderno":"201610171111",
//	"total_amount":"59.98",
//	"goods_info":"中石油油卡500元",
//	"goods_name":"中石油油卡",
//	"order_status":'1',
//	"create_time":"2016年10月18日16:40:55",
//	"goods_img":"source://image/SG.png"
//},{
//	"order_type":'1',
//	"orderno":"201610171111",
//	"total_amount":"59.98",
//	"goods_info":"中石油油卡500元",
//	"goods_name":"中石油油卡",
//	"order_status":'1',
//	"create_time":"2016年10月18日16:40:55",
//	"goods_img":"source://image/SG.png"
//},{
//	"order_type":'1',
//	"orderno":"201610171111",
//	"total_amount":"59.98",
//	"goods_info":"中石油油卡500元",
//	"goods_name":"中石油油卡",
//	"order_status":'1',
//	"create_time":"2016年10月18日16:40:55",
//	"goods_img":"source://image/SG.png"
//},
//];
http.contentType = "application/json";
page.on('getData',function(){
	var userInfo = storage.readFileSync('data://userInfo');
	http.method = "POST";
	http.setRequestHeader("Cookie", "PHPSESSID=" + userInfo.data.session_id);
	http.url = "http://192.168.1.104:9527/index.php/index/order/index";
	http.on('success',function(data){
		if(data.code == 1){
			core.p(data);
			orderData = data.data;
			listData.addData(orderData);
			listview.refreshItems();
		}else if (data.code = -1) {
			core.alert(data.msg,'温馨提示',function(){
				app.openPage("source://view/login/login.ui");
			})
		}else{
			core.toast(data.msg);
		}
	});
	http.on('fail',function(data){
		core.alert(data,'失败');
	})
	http.request();
})

page.fire('getData');
listview.refreshItems();

