/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
// //
var page = sm("do_Page");
var app = sm("do_App");
var close = ui("close");

close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

var listview = ui("listview");
var listdata = mm("do_ListData");
var d = [];
for (i = 0; i < 100; i++) {
	d[i] = {};
	d[i].name = (i + 1);
	d[i].tag = i;
	d[i].checked = false;
}
listdata.addData(d);
listview.bindItems(listdata);

//接受到listview的某一行发送过来的数据，从而去更新listdata
page.on("check_change_event", function(d) {
	var data = listdata.getOne(d.index);
	data.checked = d.checked;
	listdata.updateOne(d.index, data);
})
