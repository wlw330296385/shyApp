/**
 * @Author : and
 * @Timestamp : 2016-09-13
 */
var nf = sm("do_Notification");
var app = sm("do_App");
var debug = require("deviceone")
////返回按钮
var page = sm("do_Page");
page.on("back", function(data) {
	app.closePage();
})

var listdata = mm("do_ListData");
var do_ListView_1 = ui("do_ListView_1");
do_ListView_1.bindItems(listdata);

var d = [];
d[0] = {};
d[0].template = 0;
d[0].s_tag = [ {
	"i_source" : "source://image/banner1.jpg"
}, {
	"i_source" : "source://image/banner4.jpg"
}, {
	"i_source" : "source://image/banner3.jpg"
} ]

d[1] = {};
d[1].template = 1;
d[1].nav = [{
	"gridImage" : 'source://image/charge.gif',
	"tag" : 'source://view/charge/charge.ui',
	"gridText":'充值中心'
},{
	"gridImage" : 'source://image/car.gif',
	"tag" : 'source://view/charge/car.ui',
	"gridText":'品质汽车'
},{
	"gridImage" : 'source://image/insurance.gif',
	"tag" : 'source://view/charge/insurance.ui',
	"gridText":'保险服务'
},{
	"gridImage" : 'source://image/jewelry.gif',
	"tag" : 'source://view/charge/jewelry.ui',
	"gridText":'珠宝首饰'
},{
	"gridImage" : 'source://image/user_mall.gif',
	"tag" : 'source://view/charge/user_mall.ui',
	"gridText":'用户商城'
},{
	"gridImage" : 'source://image/score_mall.gif',
	"tag" : 'source://view/charge/score_mall.ui',
	"gridText":'积分商城'
},{
	"gridImage" : 'source://image/termination.gif',
	"tag" : 'source://view/charge/termination.ui',
	"gridText":'限时抢购'
},{
	"gridImage" : 'source://image/all.gif',
	"tag" : 'source://view/charge/all.ui',
	"gridText":'全部'
}];

d[2] = {};
d[2].template = 2;
d[2].ad='source://image/banner2.jpg';

//商品列表
d[3] = {};
d[3].template = 3;
//d[3].goodsPic = [{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/2-1.jpg',
//	'tag':'url'}];

d[4] = {};
d[4].template = 4;
//d[4].goodsPic = [{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'}];
//
//
d[5] = {};
d[5].template = 5;
//d[5].goodsPic = [{
//	'goodsPic':'source://image/2-1.jpg',
//	'tag':'url'
//},{
//	'goodsPic':'source://image/2-1.jpg',
//	'tag':'url'
//}];
//
//
d[6] = {};
d[6].template = 6;
//d[6].goodsPic = [{
//	'goodsPic':'source://image/2-1.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-2.jpg',
//	'tag':'url'}];
//
//
d[7] = {};
d[7].template = 7;
//d[7].goodsPic = [{
//	'goodsPic':'source://image/1-3.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-3.jpg',
//	'tag':'url'},{
//	'goodsPic':'source://image/1-3.jpg',
//	'tag':'url'}];
//for (var i = 2; i < 100; i++) {
//	d[i] = {};
//	d[i].b_text = "button" + i;
//	d[i].l_text = i + "label";
//};


listdata.addData(d);
do_ListView_1.refreshItems();
//debug.print(JSON.stringify(listdata.getRange(0)));
