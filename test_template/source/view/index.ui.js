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
	"name" : "数据没包括checked参数"
}, {
	"index" : "2",
	"name" : "数据包括checked参数"
}, {
	"index" : "3",
	"name" : "dataRefreshed"
} ]);
listview.bindItems(listdata);

var root = ui("$");
var app = sm("do_App");
listview.on("touch", function(index) {
	switch (index) {
	case 0:
		test1();
		break;
	case 1:
		test2();
		break;
	case 2:
		test_data_refreshed();
		break;
	}
});

function test1() {
	app.openPage({
		source : "source://view/test1/index.ui",
		statusBarState : "transparent"
	});
}

function test2() {
	app.openPage({
		source : "source://view/test2/index.ui",
		statusBarState : "transparent"
	});
}
function test_data_refreshed() {
	app.openPage({
		source : "source://view/data_refreshed/index.ui",
		statusBarState : "transparent"
	});
}