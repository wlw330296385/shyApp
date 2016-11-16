/**
 * related to basket_cell.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-18
 */
var rootview = ui("$");
var do_Button_2 = ui('do_Button_2');
var core,http,storage,userInfo,app,toPayData;
app = sm('do_App');
core = require('do/core');
rootview.setMapping({
	"do_Label_3.text":"orderno",
	"do_Label_2.text":"order_status_name",//订单状态中文
	"do_Label_7.text":"goods_name",
	"do_Label_7.tag":"goods_id",
	"do_Label_4.text":"goods_info",
	"do_Label_5.text":"create_time",
	"do_Label_6.text":"total_amount",//总价?单价
	"do_ImageView_1.source":"goods_img",
	"do_Label_1.text":"order_type_name",//订单类型中文
	"do_Label_16.text":"due_amount",//总价
	"do_Label_12.text":"quantity",
	"do_Button_2.tag":"pay_status",
	"do_Label_11.text":"total_amount",//原价
		});
rootview.on("dataRefreshed",function(){
	if(do_Button_2.tag == 0){
		do_Button_2.visible = true;
	}else{
		do_Button_2.visible = false;
	}
})
storage = sm('do_Storage');
userInfo = storage.readFileSync("data://userInfo",true);
http = mm('do_Http');
//http.url = "http://192.168.1.167:8099/index.php/index/charge/orderPay";
http.url = "http://api.e-shy.com/index.php/index/charge/orderPay";
http.contentType = "application/json";
http.method = "POST";
http.on('success',function(result){
	if (result.code == 1) {
		toPayData = {
				title:"订单支付",
				url:result.url
		}
		core.toast(result.msg);
		app.openPage('source://view/web/web.ui',toPayData);
	}
});
http.on('fail',function(result){
	core.p(result)
})
do_Button_2.on('touch',function(){
	http.body = {
			"userId" : userInfo.data.id,
			"orderId" : ui('do_Label_3').text,
			"payerName" : userInfo.data.username,
			"orderAmount" : ui('do_Label_16').text,
//			"orderAmount" : 200,
			"productName" : ui('do_Label_7').tag,
			"mobile": userInfo.data.mobile
	};
	core.p(http.body,'提交的参数');
	http.request();
})