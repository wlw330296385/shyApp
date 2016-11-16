/*******************************************************************************
 * Author :and TimeStamp :2015-10-26
 ******************************************************************************/
var nf = sm("do_Notification");
var app = sm("do_App");
// /返回按钮
var page = sm("do_Page");
var close = ui("do_Button_1");
var app = sm("do_App");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})

// //

var album = sm("do_Album");
var change = ui("do_ALayout_4");
var image = ui("do_ImageView_4");
var beforeCrop;
change.on("touch", function() {
	album.select(1, 500, -1, function(data, e) {
		beforeCrop = data[0];
		app.openPage("source://view/crop.ui", data[0]);
	})
})
page.on("result", function(path) {
	if (path)
		image.source = path;
	else
		image.source = beforeCrop;
})