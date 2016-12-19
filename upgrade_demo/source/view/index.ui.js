
var app = sm("do_App");
// //
var page = sm("do_Page");
var close = ui("do_ALayout_3");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //
var btn_hello = ui("btn_hello");

btn_hello.on("touch", function() {
	app.openPage({
		source : "source://view/aa/test.ui",
		statusBarState : "transparent"
	});
});