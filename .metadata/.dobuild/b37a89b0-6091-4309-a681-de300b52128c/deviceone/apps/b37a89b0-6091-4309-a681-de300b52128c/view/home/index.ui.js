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


//商品列表
d[1] = {};
d[1].template = 1;

listdata.addData(d);
do_ListView_1.refreshItems();
//debug.print(JSON.stringify(listdata.getRange(0)));
