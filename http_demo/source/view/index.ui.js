/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
// //
var page = sm("do_Page");
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

listdata.addData([ {
	"index" : "1",
	"name" : "测试do_Http的GET"
}, {
	"index" : "2",
	"name" : "测试do_Http的POST"
},{
	"index" : "3",
	"name" : "测试do_Http的UPLOAD"
},{
	"index" : "4",
	"name" : "测试do_Http的FORM"
}, {
	"index" : "5",
	"name" : "测试do_Http的DOWNLOAD"
} ]);
listview.bindItems(listdata);

var app = sm("do_App");
var datacache = sm("do_DataCache");

var ip_field = ui("do_TextField_1");
var host = datacache.loadData("host");
if (host)
	ip_field.text = host;

listview.on("touch", function(index) {
	switch (index) {
	case 0:
		openNewPage("get");
		break;
	case 1:
		openNewPage("post");
		break;
	case 2:
		openNewPage("upload");
		break;
	case 3:
		openNewPage("form");
		break;
	case 4:
		openNewPage("download");
		break;
	}
});
function openNewPage(p) {
	app.openPage({
		source : "source://view/" + p + "/index.ui",
		data : gethost(),
		statusBarState : "transparent"
	});
}
function gethost() {
	var host = ip_field.text;
	datacache.saveData("host", host);
	return host;
}