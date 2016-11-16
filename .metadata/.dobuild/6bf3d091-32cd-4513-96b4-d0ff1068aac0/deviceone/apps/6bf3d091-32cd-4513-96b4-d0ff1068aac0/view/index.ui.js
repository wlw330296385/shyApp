/**********************************************
 * Author : @Author
 * Timestamp : @Timestamp
 **********************************************/
var app = sm("do_App");
var btn_hello = ui("do_Button_1");
////
var page = sm("do_Page");
var close = ui("close");
close.on("touch", function() {
	app.closePage();
})
page.on("back", function(data) {
	app.closePage();
})
// //

btn_hello.on("touch", function() {
	app.openPage({
		source : "source://view/login.ui",
		statusBarState : "transparent"
	});
});