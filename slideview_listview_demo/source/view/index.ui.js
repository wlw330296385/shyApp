/**
 * @Author : and
 * @Timestamp : 2016-09-13
 */
var nf = sm("do_Notification");
var app = sm("do_App");
////返回按钮
var page = sm("do_Page");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

var listdata = mm("do_ListData");
var listview = ui("do_ListView_1");
listview.bindItems(listdata);

var d = [];
d[0] = {};
d[0].template = 1;
d[0].s_tag = [ {
	"i_source" : "source://image/1.png"
}, {
	"i_source" : "source://image/2.png"
}, {
	"i_source" : "source://image/3.png"
} ]
for (var i = 1; i < 100; i++) {
	d[i] = {};
	d[i].b_text = "button" + i;
	d[i].l_text = i + "label";
}
listdata.addData(d);
listview.refreshItems();