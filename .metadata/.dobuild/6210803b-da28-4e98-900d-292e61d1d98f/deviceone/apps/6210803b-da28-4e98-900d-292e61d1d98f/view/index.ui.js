/**
 * related to index.ui
 * 
 * @Author : 18507717466
 * @Timestamp : 2016-10-18
 */
var app = sm('do_App');
var page = sm('do_Page');
var viewShower = ui('do_ViewShower_1');
var pages = [
       {id:'basket',path:'source://view/basket.ui'}
       ];

ui('do_Button_1').on('touch',function(){
	viewShower.addViews(pages);
	viewShower.showView('basket');
})

var storage = sm('do_Storage');
var listData = [{
	"order_type":'1',
	"orderno":"201610171111",
	"total_amount":"59.98",
	"goods_info":"中石油油卡500元",
	"goods_name":"中石油油卡",
	"order_status":'1',
	"create_time":"2016年10月18日16:40:55",
	"goods_img":"source://image/SG.png"
},{
	"order_type":'1',
	"orderno":"201610171111",
	"total_amount":"59.98",
	"goods_info":"中石油油卡500元",
	"goods_name":"中石油油卡",
	"order_status":'1',
	"create_time":"2016年10月18日16:40:55",
	"goods_img":"source://image/SG.png"
},{
	"order_type":'1',
	"orderno":"201610171111",
	"total_amount":"59.98",
	"goods_info":"中石油油卡500元",
	"goods_name":"中石油油卡",
	"order_status":'1',
	"create_time":"2016年10月18日16:40:55",
	"goods_img":"source://image/SG.png"
},{
	"order_type":'1',
	"orderno":"201610171111",
	"total_amount":"59.98",
	"goods_info":"中石油油卡500元",
	"goods_name":"中石油油卡",
	"order_status":'1',
	"create_time":"2016年10月18日16:40:55",
	"goods_img":"source://image/SG.png"
},{
	"order_type":'1',
	"orderno":"201610171111",
	"total_amount":"59.98",
	"goods_info":"中石油油卡500元",
	"goods_name":"中石油油卡",
	"order_status":'1',
	"create_time":"2016年10月18日16:40:55",
	"goods_img":"source://image/SG.png"
},
];
page.on('loaded',function(){
	storage.writeFile("data://listData", listData, function(data, e) {
		
	})
})
