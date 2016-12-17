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
	"i_source" : "http://api.e-shy.com/uploads/banner/1.jpg"
}, {
	"i_source" : "http://api.e-shy.com/uploads/banner/2.jpg"
}, {
	"i_source" : "http://api.e-shy.com/uploads/banner/3.jpg"
} ]

//商品列表
d[1] = {};
d[1].template = 1;
//d[2] = {};
//d[2].template = 2;
listdata.addData(d);
do_ListView_1.refreshItems();

//扫描二维码
var qrcode = sm('do_QRCode');
ui('do_ALayout_3').on('touch',function(){
	app.openPage("source://view/common/barCodeView.ui");
})

//隐藏键盘
var root = ui('$');
root.on('touch'),function(){
	page.hideKeyboard();
}